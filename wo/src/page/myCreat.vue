<template>
	<div class='sorcePool boxBody'>
		<h1>自创</h1>
		<span>未发布</span>
		<span>已发布</span>
		<span>删除</span>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="title" label="标题" width="">
			</el-table-column>
			<el-table-column prop="name" label="封面" width="">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="">
			</el-table-column>
			<el-table-column prop="getTime" label="抓取时间" width="">
			</el-table-column>
			<el-table-column prop="putDate" label="原创发布时间" width="">
			</el-table-column>
			<el-table-column prop="containt" label="内容" width="">
			</el-table-column>
			<el-table-column label="发布状态" width="">
				<template scope="scope">
					<el-switch active-value="1" inactive-value="0" v-model="scope.row.isreleace" @change=change(scope.$index,scope.row)></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="soureceSee(scope.$index, scope.row)">预览</el-button>
					<el-button size="mini" type="danger" @click="sourceDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

</template>

<script>
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
					containt: '铼看科技有限公司今晨发布公告“招生宝正式上线”',
					isreleace:1
				}]
			}
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