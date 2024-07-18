let isDragging = false;
        let startX, startY;
        let offsetX = 0, offsetY = 0;
        let translateX = 0, translateY = 0;

        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                offsetX = e.clientX - startX;
                offsetY = e.clientY - startY;
                draw();
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
            translateX += offsetX;
            translateY += offsetY;
            offsetX = 0;
            offsetY = 0;
        });

        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
            translateX += offsetX;
            translateY += offsetY;
            offsetX = 0;
            offsetY = 0;
        });

        function draw() {
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset the transformation matrix
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.translate(translateX + offsetX, translateY + offsetY); // Translate the canvas
            // Redraw elements
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, 200, 200);
            ctx.fillStyle = 'blue';
            ctx.fillRect(300, 300, 200, 200);
        }