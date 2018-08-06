<template>
	<div class="upload">
		<div class='myimg'>
			<img :src="imgData" width="120" alt="" />
		</div>
		<el-button @click="upimg">点击上传</el-button>
		 <div class='myImgUpload'  :class="{'myImgUp':isShow}">
		    	<span class='exitUp' @click="exit">&#xe602;</span>
		    		<iframe width="40%" height="50%" style="position: fixed;left: 30%;top: 20%;" src="../../static/xcideoupload/index.html" id="ifr1" name="ifr1" scrolling="yes"></iframe>
		 </div>
	</div>
</template>

<script>
	export default {
		name: 'upload',
		data() {
			return {
				isShow:true,
				imgData:''
			}
		},
		methods: {
			upimg(){
				this.isShow=false;
				window.upget = (a,b)=>{
					this.isShow=true
					console.log(a,b)
					this.$emit('getImgUrl',a)
				}
			},
			exit(){
				this.isShow=true
			},
	   }				
	}

</script> 

<style>
 .myImgUpload{
      	position: fixed;
      	left: 0;
      	right: 0;
      	top: 0;
      	bottom: 0;
      	background-color: rgba(0,0,0,.5)
      }
      .myImgUp{
      	display:none;
      }
      .exitUp{
      	font-family: 'iconfont';
      	position:fixed;
      	left: 68%;
      	top: 20%;
      	z-index:99;
      	font-size: 28px
      }
      .myimg{
      	width:120px;
      }
</style>