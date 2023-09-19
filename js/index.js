document.addEventListener('DOMContentLoaded', function () {
    const dataSelector = document.getElementById('dataSelector');
    const colorSelector = document.getElementById('colorSelector');
    const orientationSelector = document.getElementById('orientationSelector');
    const generateChartButton = document.getElementById('generateChart');
    const chartCanvas = document.getElementById('chartCanvas');
    const ctx = chartCanvas.getContext('2d');

    generateChartButton.addEventListener('click', function () {
        const data = getData();
        const color = colorSelector.value;
        const orientation = orientationSelector.value;

        clearCanvas(ctx);
        drawChart(ctx, data, color, orientation);
    });

    function clearCanvas(context) {
        context.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    }

    function drawChart(context, data, color, orientation) {
        const canvasWidth = chartCanvas.width;
        const canvasHeight = chartCanvas.height;

        context.fillStyle = color;

        const max = Math.max(...data.values);
        const barWidth = 30;
        const spacing = 20;
        const barSpacing = barWidth + spacing;
        const startY = canvasHeight - 50;

        data.values.forEach((value, index) => {
            const x = (index + 1) * barSpacing;
            const barHeight = (value / max) * (startY - 20);

            if (orientation === 'vertical') {
                context.fillRect(x, startY - barHeight, barWidth, barHeight);
                context.fillText(data.labels[index], x, startY + 20);
            } else {
                const barY = canvasHeight - x;
                context.fillRect(0, barY, barHeight, barWidth);
                context.fillText(data.labels[index], barHeight + 10, barY + barWidth - 10);
            }
        });
    }

    function getData() {
        const selectedData = dataSelector.value;
        if (selectedData === 'navegador') {
            return {
                labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Otros'],
                values: [60, 15, 10, 10, 5],
            };
        } else if (selectedData === 'sistemaOperativo') {
            return {
                labels: ['Windows', 'MacIOS', 'Linux', 'Otros'],
                values: [70, 20, 5, 5],
            };
        }
    }
});

