<template>
  	  <!--浏览次数条形统计图-->
  	  <div>
  	  	<h1>次数统计图</h1>
  	  	 <div class='mytu'>
	  	  	<div id="myChart"></div>
	  	 </div>
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
                    name: '单位：时刻',
                    type: 'category',
                    // true的话， 数据的显示位置在中间 默认就是true
                       boundaryGap: false,
                    // 设置横坐标数据的摆放样式
                    axisLabel: {
                        interval: 0,
                        rotate: 0,
                        showMinLabel: true
                    },
                    data: ['8.00', '10.00', '12.00', '14.00', '16.00','18.00','20.00','夜间'],
                    splitLine:{
						　　　　show:false
						　　}

                },
         yAxis: {
                    name: '单位:(次)',
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
                        data: [1108, 2175, 2653, 1987, 4675,1202,3344,7096],
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
