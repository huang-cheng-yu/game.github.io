class AnimatedBlock {
    constructor(x, y, width, height, number, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.number = number;
        this.ctx = ctx;
        this.scale = 0; // 初始化缩放比例为0
    }

    draw() {
        // 逐渐增加方块的缩放比例
        this.scale += 0.08; // 控制增加的速度，可以调整这个值来改变动画速度

        // 根据缩放比例设置方块的宽高
        let scaledWidth = this.width * this.scale;
        let scaledHeight = this.height * this.scale;

        // 根据数字设置方块的背景颜色
        let color;
        switch (this.number) {
            case 2:
                color = 'lightblue';
                break;
            case 4:
                color = 'lightgreen';
                break;
            case 8:
                color = 'lightyellow';
                break;
            case 16:
                color = 'lightpink';
                break;
            case 32:
                color = 'lightsalmon';
                break;
            case 64:
                color = 'lightcoral';
                break;
            case 128:
                color = 'lightseagreen';
                break;
            case 256:
                color = 'lightcyan';
                break;
            case 512:
                color = 'lightgrey';
                break;
            case 1024:
                color = 'lightgoldenrodyellow';
                break;
            default:
                color = 'white'; // 设置默认背景颜色
                break;
        }

        // 绘制方块
        this.ctx.clearRect(this.x, this.y, this.width, this.height); // 清除方块之前的绘制
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.x + (this.width - scaledWidth) / 2, this.y + (this.height - scaledHeight) / 2, scaledWidth, scaledHeight);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.x + (this.width - scaledWidth) / 2, this.y + (this.height - scaledHeight) / 2, scaledWidth, scaledHeight);

        // 绘制方块中央的数字
        this.ctx.fillStyle = 'black';
        this.ctx.font = 'bold 25px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.number, this.x + this.width / 2, this.y + this.height / 2);

        // 如果缩放比例小于1，继续绘制下一帧
        if (this.scale < 1) {
            requestAnimationFrame(this.draw.bind(this));
        }
    }
}