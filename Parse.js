<!DOCTYPE html>
<html>
<head>
    <title>Canvas Example</title>
</head>
<body>
<canvas id="myCanvas" width="800" height="600" style="border:1px solid #000000;"></canvas>

<script>
    const constructs = [
        {
            id: 0,
            title: "АПК МД АСРС",
            lines: [
                {
                    address: 1,
                    color: "green"
                },
                {
                    address: 2,
                    color: "green"
                },
                {
                    address: 3,
                    color: "green"
                },
            ]
        },
        {
            id: 1,
            title: "АПК МД Визит",
            lines: [
                {
                    address: 0,
                    color: "green"
                },
                {
                    address: 2,
                    color: "green"
                },
                {
                    address: 3,
                    color: "green"
                },
            ]
        },
        {
            id: 2,
            title: "АПК МД Церий",
            lines: [
                {
                    address: 0,
                    color: "green"
                },
                {
                    address: 1,
                    color: "green"
                },
                {
                    address: 3,
                    color: "green"
                },
            ]
        },
        {
            id: 3,
            title: "АПК МД Рябина",
            lines: [
                {
                    address: 0,
                    color: "green"
                },
                {
                    address: 1,
                    color: "green"
                },
                {
                    address: 2,
                    color: "green"
                },
            ]
        },
    ];

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const rectWidth = 100;
    const rectHeight = 50;
    const positions = [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 100, y: 300 },
        { x: 300, y: 300 }
    ];

    // Draw rectangles
    constructs.forEach((construct, index) => {
        const pos = positions[index];
        ctx.strokeRect(pos.x, pos.y, rectWidth, rectHeight);
        ctx.fillText(construct.title, pos.x + 10, pos.y + 25);
    });

    // Draw lines
    constructs.forEach((construct, index) => {
        const fromPos = positions[index];
        construct.lines.forEach(line => {
            const toPos = positions[line.address];
            ctx.beginPath();
            ctx.moveTo(fromPos.x + rectWidth / 2, fromPos.y + rectHeight / 2);
            ctx.lineTo(toPos.x + rectWidth / 2, toPos.y + rectHeight / 2);
            ctx.strokeStyle = line.color;
            ctx.stroke();
        });
    });
</script>
</body>
</html>


https://software.download.prss.microsoft.com/dbazure/Win10_22H2_English_x64v1.iso?t=fbe964fe-1857-4d19-8116-7896b84d471e&P1=1719310362&P2=601&P3=2&P4=JKScxAa%2bDKOsvEhcSlwZq2XSGgkxn2AWiRbrnYaRAMJWJ1ahKlmQOUpM4MPZr9qbEGjBCItbjo3I9Cm%2b5nW8RV%2fhKXEq9qScaDAnBCTeeGc3%2fzrcThPfcy1hM9UoaSCPnotamts52LqkZIkEffBzxeJfTcs1osYJR9NChBsBsjj0Rvn8X0dxrcwdERs%2fQpXQt3TATS1kmhcx1fjXciPySOeZwvvUSB0BNU0SWqqKcARQzncPje2tkISdAYxa%2bp%2bs5Oh76qs3inDxZ%2b7rplBZVjog%2b9SnvuCA6RS%2fJUQSGNY2OSDGEhqENdKkhXV9snCGBXha0XRr5gFP%2fAmhH50lIA%3d%3d