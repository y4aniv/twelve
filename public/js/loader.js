var time = {
    start: new Date().getTime(),
    end: 0,
    duration: 0
}

window.onload = () => {
    time.end = new Date().getTime()
    time.duration = time.end - time.start
    if (time.duration < 1000) {
        setTimeout(() => {
            document.getElementById('loader').style.opacity = 0
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none'
            }, 500)
        }, 1000 - time.duration)
    } else {
        document.getElementById('loader').style.opacity = 0
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none'
        }, 500)
    }
}