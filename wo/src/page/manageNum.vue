<template>
	<div class='sorcePool boxBody'>
		<h1>运营数据</h1>
		<div><OpenTwice1/></div>
		<div><OpenTwice2/></div>
		<div><OpenTwice3/></div>
	</div>

</template>

<script>
	import OpenTwice1 from '@/page/second/openTwice1'
	import OpenTwice2 from '@/page/second/openTwice2'
	import OpenTwice3 from '@/page/second/openTwice3'
	export default {
		data() {
			return {
				tableData: [{
					id:1,
					title: '招生宝正式上线了！',
					imgurl: '',
					type: '图文',
					getTime: '2016-05-02',
					putDate: '2016-05-02',
					containt: '铼看科技有限公司今晨发布公告公告“招生宝于今日正式上线”',
					isreleace:1
				}]
			}
		},
		components: {
		    OpenTwice1,
		    OpenTwice2,
		    OpenTwice3
		  },
		methods:{
			//发布状态
				change(index,row){
		          var that=this
		          if(row.isreleace==0){
		            console.log("11")
//		              var parm={
//		              }
//		              this.$axios.get('',{params:parm}).then(function(reqs){
//		
//		              }).catch(function(err){
//		                console.log(err)
//		              })
		          }
		          if(row.isreleace==1){
		          	 console.log("22")
//		            var parm={
//		            }
//		            this.$axios.get('',{params:parm}).then(function(reqs){
//		
//		            }).catch(function(err){
//		              console.log(err)
//		            })
		          }
		        },
		        soureceSee(index,row){
		        	console.log(row)
		        	console.log(index)
		        },
//		        删除资源
		        sourceDel(index,row){
	                var that=this
	                console.log(row)
	                this.$confirm('是否确认删除该资源?', '提示', {
	                    confirmButtonText: '确定',
	                    cancelButtonText: '取消',
	                    type: 'warning'
	                }).then(()=>{
	                    console.log("是")
	                    this.$message({
	                        type: 'success',
	                        message: '删除成功!'
	                    });
	                }).catch(()=>{
	                    this.$message({
	                        type: 'info',
	                        message: '已取消删除操作'
	                    });
	                });
            }
		        
		}
	}
</script>
<style>
	.el-table th{
		text-align: center;
	}
td{
	text-align: center;
}

</style>