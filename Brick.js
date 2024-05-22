class Brick
{
	constructor(context, options = {}) {
		
		this.x = options.x;
		this.vx = options.vx;
		
		this.y = options.y;
		this.vy = options.vy;
		this.gravity = options.gravity;
		this.friction = options.friction;
		this.energy = options.energy;
		this.ax = options.ax;
		
		this.color = options.color;
		this.width = options.width;
		this.height = options.height;
		
		this.ctx = context;

		this.temp = false;
		this.number = options.number;
		
	}
	
	draw() {
		
		
		switch (this.number) {
			case 2:
				this.ctx.fillStyle = 'lightblue'; // 设置背景颜色
				break;
			case 4:
				this.ctx.fillStyle = 'lightgreen'; // 设置背景颜色
				break;
			case 8:
				this.ctx.fillStyle = 'lightyellow'; // 设置背景颜色
				break;
			case 16:
				this.ctx.fillStyle = 'lightpink'; // 设置背景颜色
				break;
			case 32:
				this.ctx.fillStyle = 'lightsalmon'; // 设置背景颜色
				break;
			case 64:
				this.ctx.fillStyle = 'lightcoral'; // 设置背景颜色
				break;
			case 128:
				this.ctx.fillStyle = 'lightseagreen'; // 设置背景颜色
				break;
			case 256:
				this.ctx.fillStyle = 'lightcyan'; // 设置背景颜色
				break;
			case 512:
				this.ctx.fillStyle = 'lightgrey'; // 设置背景颜色
				break;
			case 1024:
				this.ctx.fillStyle = 'lightgoldenrodyellow'; // 设置背景颜色
				break;
			default:
				this.ctx.fillStyle = 'white'; // 设置默认背景颜色
				break;
		}
		
		
		this.ctx.fillRect(this.x, this.y, this.width, this.height); // 繪製方塊
		this.ctx.strokeStyle = 'black'; // 設定邊框顏色
		this.ctx.lineWidth = 2; // 設定邊框寬度
		this.ctx.strokeRect(this.x, this.y, this.width, this.height); // 繪製方塊邊框
		
		 // 在方塊中央繪製數字
		this.ctx.fillStyle = 'black'; // 設定文字顏色為黑色
		this.ctx.font = 'bold 25px Arial'; // 設定字體樣式、粗細和大小
		this.ctx.textAlign = 'center'; // 設定文字對齊方式為中央
		this.ctx.textBaseline = 'middle'; // 設定文字基準線為中央
		
		this.ctx.fillText(this.number , this.x + this.width / 2, this.y + this.height / 2); // 繪製文字
		
    }
	
	vertical()
	{
		this.vy += this.gravity;
		this.y += this.vy;
		
		if(this.y + this.height   >= canvas.height )
		{
			this.y = canvas.height-this.height;
			this.vy = 0;
		}
		
		if(this.y < 0 )
		{
			this.y = 0;
			this.vy = 0;
		}
		
	}
	
	pan()
	{
		this.vx += this.ax;
		this.x += this.vx;
		
		
		if(this.x+this.width >= canvas.width)
		{
			this.x = canvas.width-this.width;
			this.vx =0;
		}
		
		if(this.x <= 0 )
		{
			this.x = 0 ;
			this.vx = 0;
			
			//this.vx *=-1;
		}
		
		if(this.x <=0 || this.x+this.width >= canvas.width)
		{
			this.temp =true;
		}else{
			this.temp =false;
		}
		//this.temp =false;
		//console.log(this.temp);
	}
	
	 checkCollision(obstacle)
	 {
		if 
		(
			this.x < obstacle.x + obstacle.width &&
			this.x + this.width > obstacle.x &&
			this.y < obstacle.y + obstacle.height &&
			this.y + this.height > obstacle.y
		){
			
			const fromTop = this.y + this.height - obstacle.y;
			const fromBottom = obstacle.y + obstacle.height - this.y;
			const fromLeft = this.x + this.width - obstacle.x;
			const fromRight = obstacle.x + obstacle.width - this.x;
			if (Math.min(fromTop, fromBottom, fromLeft, fromRight) === fromTop) {
				return {status:true,x:obstacle.x,y: this.y+this.height,from:'fromTop'};
			} else if (Math.min(fromTop, fromBottom, fromLeft, fromRight) === fromBottom) {
				return {status:true,x:obstacle.x,y:this.y-obstacle.height,from:'fromBottom'};
			} else if (Math.min(fromTop, fromBottom, fromLeft, fromRight) === fromLeft) {
				return {status:true,x:this.x+this.width ,y:obstacle.y,from:'fromLeft'};
			} else if (Math.min(fromTop, fromBottom, fromLeft, fromRight) === fromRight) {
				return {status:true,x:this.x-obstacle.width,y:obstacle.y,from:'fromRight'};
			}else{
				return {status:false};
			}
		}
		
		return {status:false};
	 }
	
}