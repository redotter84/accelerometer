const data = []

function record(ev) {
    const axes = ['x', 'y', 'z']
    for (const axis of axes) {
        const el = document.getElementById(`acl-axis-${axis}`)
        const val = ev.acceleration[axis]
        el.innerHTML = val.toFixed(2)
    }
    document.getElementById('acl-interval').innerHTML = event.interval
    data.push(ev.acceleration)
}

function startRecording(button) {
    window.addEventListener('devicemotion', record)
    button.innerHTML = button.innerHTML.replace('Start', 'Stop')
}

function stopRecording(button) {
    window.removeEventListener('devicemotion', record)
    button.innerHTML = button.innerHTML.replace('Stop', 'Start')
}

function exportData() {
    let result = ""
    for (const measure of data) {
        result += `${measure.x},${measure.y},${measure.z}\n`
    }
    const textarea = document.getElementById('acl-result')
    textarea.value = result
    textarea.select()
    document.execCommand('Copy')
    textarea.value = 'Copied to clipboard!'
}

function toggleDemo(ev) {
    ev.preventDefault()

    const button = ev.target
    const toStart = button.innerHTML.indexOf('Start') !== -1
    if (toStart) {
        startRecording(button)
    } else {
        stopRecording(button)
    }
}


window.onload = () => {
    document.getElementById('acl-recording-btn').addEventListener('click', toggleDemo)
    document.getElementById('acl-export-btn').addEventListener('click', exportData)
}
