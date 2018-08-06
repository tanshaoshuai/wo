<template>
  	  <!--浏览次数条形统计图-->
  	  <div class='mytu'>
  	  	<div id="myChart"></div>
  	  </div>
</template>
<style>
	
	.ispay>p{
		color:rgba(100,107,142,1)
	}
	.mytu{
	padding-top: 20px;
	width: 100%;
    height: 303px;
	}
	#myChart {
    width: 100%;
    height: 283px; 
}
</style>
 
<script>
  export default {
    data() {
	      return {
	      	
	      }
	    },
    mounted(){
      this.drawLine();
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
          text: '用户观看次数统计',
          subtext: ''
          },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        legend: {
          data:[]
        },
        toolbox: {
          show: false,
          feature: {
          	 dataZoom: {
             yAxisIndex: 'none'
        },
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        markline:{
        	data:[{
        		name:'1o',
        		value:180,
        		x:150,
        		y:20
        	},
        	{
        		name:'1op',
        		x:250,
        		y:120
        	}
        	]
        },
         textStyle:{
				    	fontSize:12
				    },

         xAxis: {
                    name: '',
                    type: 'category',
                    // true的话， 数据的显示位置在中间 默认就是true
                       boundaryGap: false,
                    // 设置横坐标数据的摆放样式
                    axisLabel: {
                        interval: 0,
                        rotate: 0,
                        showMinLabel: true
                    },
                    data: ['0-10', '10-20', '20-30', '30-40', '40分钟以上'],
                    splitLine:{
						　　　　show:false
						　　}

                },
         yAxis: {
                    name: '单位:千人',
                    type: 'value',
                    // 可以通过splitNumber进行改变分割间隔，默认值是5
                    splitNumber: 2,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
         series: [{
                        name: '观看人数',
                        color:'#14C864',
                        type: 'line',
                        symbol:0,
                        data: [1.108, 2.175, 2.653, 1.987, 4.675],
                        // 控制是否显示折线上每个点对应的y坐标值
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle:{
                        	normal:{
                        		lineStyle:{
                        			color:'#14C864'
                        		}
                        	}
                        }
                      
                    }
                ]
        });
       
        
      }
    }
  }

</script>
