import { chartOptions } from "../constants/options";
import { worker } from "../workerInterface";
import { ClickTarget } from "../constants/AppConstants";

const enum ChartUpdate {
    _selection,
    _repaint,

    selection = 1 << _selection,
    repaint = 1 << _repaint,
}

const wrap = document.createElement("div");
const selectionEl = document.createElement("div");
const canvas = document.createElement("canvas");
const ctx: any = canvas.getContext("2d");

let startX = 0,
    x0 = 0,
    x1 = 0,
    selectStart = 0,
    selectEnd = 0,
    updateStart = 0,
    updateEnd = 0,
    yMin = 0,
    yMax = 0,
    yRange = 1,
    heightAdjust = 1,
    changes = 0,
    width = chartOptions.style.width,
    height = chartOptions.style.height,
    colWidth = 30;
let listenersAttached = false,
    isSelecting = false,
    initSelection = false;
let chartType = "",
    barColor = "",
    selectedColor = "";
let data: any[] = [];
canvas.width = width;
canvas.height = height;
wrap.style.width = "100%";
wrap.style.height = "100%";
wrap.style.overflow = "hidden";
wrap.style.position = "relative";
canvas.style.position = "absolute";
selectionEl.style.position = "absolute";
selectionEl.style.background = "rgba(0,100,255,0.5)";
selectionEl.style.height = "100%";
selectionEl.style.width = "100%";
selectionEl.style.top = "0";
selectionEl.style.left = "0";
selectionEl.style.transformOrigin = "left center 0";
selectionEl.style.display = "none";
wrap.appendChild(canvas);
wrap.appendChild(selectionEl);
canvas.setAttribute("data-target", "" + ClickTarget.chart);

export function mountChart(el: HTMLElement) {
    if (!(el && el instanceof HTMLElement)) return;
    if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    const rect = el.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
    el.appendChild(wrap);
}

export function unmount() {
    if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    setListeners(false);
}

export function handleMouseDown(event: MouseEvent) {
    if (!isSelecting) {
        startX = event.clientX;
        x0 = startX - wrap.getBoundingClientRect().left;
        x1 = startX;
        if (event.shiftKey) {
            handleShiftClick();
        } else {
            isSelecting = true;
            initSelection = true;
            changes |= ChartUpdate.selection;
            setListeners(true);
        }
    }
}

export function update() {
    if (changes === 0) return;
    if (changes & ChartUpdate.selection) {
        if (isSelecting) updateSelection();
        else {
            changes ^= ChartUpdate.selection;
            endSelection();
        }
    }
    if (changes & ChartUpdate.repaint) {
        if (repaintData()) changes ^= ChartUpdate.repaint;
    }
}

export function setData(arr: number[]) {
    data = arr;
    updateStart = 0;
    updateEnd = data.length - 1;
    selectStart = 0;
    selectEnd = 0;
    x0 = 0;
    // if arr.length > 0
    if (updateEnd) {
        colWidth = ((width / updateEnd) + 0.5) >>> 0;
    }
    ctx.clearRect(0, 0, width, height);
    changes |= ChartUpdate.repaint;
}

export function clearSelection() {
    updateStart = selectStart;
    updateEnd = selectEnd;
    selectStart = 0;
    selectEnd = 0;
    x0 = 0;
    changes |= ChartUpdate.repaint;
    setListeners(false);
}

export function focusNext(prev: boolean, shiftKey: boolean) {
    if (shiftKey) {
        if (prev) selectRange(selectStart - 1, selectEnd);
        else selectRange(selectStart, selectEnd + 1);
    } else {
        if (prev) selectRange(selectStart - 1, selectStart - 1);
        else selectRange(selectEnd + 1, selectEnd + 1);
    }
    changes |= ChartUpdate.repaint;
}

export function setChartType(type: string) {
    if (chartType !== type) {
        const typeOptions = chartOptions[type];
        chartType = type;
        barColor = typeOptions.dataColor;
        selectedColor = typeOptions.selectionColor;
        yMin = typeOptions.yMin;
        yMax = typeOptions.yMax;
        yRange = yMax - yMin;
        heightAdjust = height / yRange;
    }
}



function handleKeyDown(event) {
    switch (event.key) {
        case "Escape":
            clearSelection();
            break;

        case "ArrowLeft":
        case "ArrowRight":
            focusNext(event.key === "ArrowLeft", event.shiftKey);
            break;
    }
}

function repaintData(): boolean {
    const start = performance.now();
    if (updateStart === 0 && updateEnd === data.length)
        ctx.clearRect(0, 0, width, height);
    while (updateStart <= updateEnd) {
        paintCol(updateStart++);
        if (performance.now() - start > 3) break;
    }
    return updateStart > updateEnd;
}

function paintCol(i: number) {
    const colHeight = ((heightAdjust * (data[i] - yMin) + 0.5) >>> 0);
    ctx.fillStyle = i >= selectStart && i <= selectEnd ?
        selectedColor : barColor;
    ctx.fillRect(i * colWidth, height - colHeight, colWidth, colHeight);
}

function updateSelection() {
    if (initSelection) {
        initSelection = false;
        selectionEl.style.left = x0 + "px";
        selectionEl.style.display = "block";
    }
    selectionEl.style.transform = `scale3d(${(x1 - startX) / width},1,1)`;
}

function endSelection() {
    selectRange(colAtX(x0), colAtX(x1 - wrap.getBoundingClientRect().left));
    selectionEl.style.display = "none";
}

function handleMouseMove(event: MouseEvent) {
    x1 = event.clientX;
}

// on mouseup or window.mouseout
function cancelDrag(event: MouseEvent) {
    isSelecting = false;
}

function handleShiftClick() {
    const col = colAtX(x0);
    let a = selectStart;
    let b = selectEnd;
    // if before start
    if (col < a) a = col;
    // if after end
    else if (col > b) b = col;
    // if closer to start
    else if (col - a < b - col) a = col;
    // if closer to end
    else b = col;
    selectRange(a, b);
}

/**
 * get the index of col as x coordinate
 * @param x - x coordinate relative to canvas
 * @return col index. does not validate against data.length
 */
function colAtX(x: number): number {
    return (x / colWidth) >>> 0;
}

/**
 * set range for selection, mark cols for repaint
 * @param from starting index
 * @param to last index included in selection
 */
function selectRange(from: number, to: number) {
    const prevStart = selectStart;
    const prevEnd = selectEnd;

    // ensure from/to are >=0 && < data.length
    from = validIndex(from);
    to = validIndex(to);

    // ensure from is smaller than to
    // switch values if not
    if (from > to) {
        from ^= to;
        to ^= from;
        from ^= to;
    }

    selectStart = from;
    selectEnd = to;

    updateStart = prevStart < selectStart ? prevStart : selectStart;
    updateEnd = prevEnd > selectEnd ? prevEnd : selectEnd;
    if (--updateStart < 0) updateStart = 0;
    if (++updateEnd >= data.length) updateEnd = data.length - 1;
    changes |= ChartUpdate.repaint;

    worker.postMessage({
        data: [from, to],
        type: "stats"
    });
}

function validIndex(i: number): number {
    if (i < 0) return 0;
    if (i > data.length) return data.length;
    return i;
}

function setListeners(active: boolean) {
    if (active) {
        if (!listenersAttached) {
            listenersAttached = true;
            window.addEventListener("mousemove", handleMouseMove, false);
            window.addEventListener("mouseup", cancelDrag, false);
            window.addEventListener("keydown", handleKeyDown, false);
        }
    } else if (listenersAttached) {
        listenersAttached = false;
        window.removeEventListener("mousemove", handleMouseMove, false);
        window.removeEventListener("mouseup", cancelDrag, false);
        window.removeEventListener("keydown", handleKeyDown, false);
    }
}

function animate() {
    requestAnimationFrame(animate);
    update();
}

requestAnimationFrame(animate);
