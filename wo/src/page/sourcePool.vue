<template>
	<div class='sorcePool boxBody'>
		<div class='tellme'>
			<template>
				<span>提示：</span>
				<el-switch active-value="1" inactive-value="0" value='0'></el-switch>未发布
				<el-switch active-value="1" inactive-value="0" value='1'></el-switch>已发布
				<el-button type="primary" size="mini" icon="el-icon-search"></el-button>预览
				<el-button type="success" size="mini" icon="el-icon-share"></el-button>发布
			</template>
		</div>
		<div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="title" label="标题" width="80">
				</el-table-column>
				<el-table-column prop="name" label="封面" width="100">
				</el-table-column>
				<el-table-column prop="type" label="类型" width="60">
				</el-table-column>
				<el-table-column prop="getTime" label="抓取时间" width="100">
				</el-table-column>
				<el-table-column prop="putDate" label="原创发布时间" width="100">
				</el-table-column>
				<el-table-column prop="containt" label="内容" width="">
				</el-table-column>
				<el-table-column label="发布状态" width="60">
					<template scope="scope">
						<el-switch active-value="1" inactive-value="0" v-model="scope.row.isreleace" disabled @change=change(scope.$index,scope.row)></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="">
					<template slot-scope="scope">
						<el-button type="primary" size="small" icon="el-icon-search" @click="soureceSee(scope.$index, scope.row)"></el-button>
						<el-button type="success" size="small" icon="el-icon-share" @click="sourceShare(scope.$index, scope.row)"></el-button>
						<el-button type="primary" size="small" icon="el-icon-edit" @click="soureceEdit(scope.$index, scope.row)"></el-button>
						<el-button type="danger" size="small" icon="el-icon-delete" @click="sourceDel(scope.$index, scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="block mycenter">
		  <el-pagination
		    layout="prev, pager, next"
		    :total="dataTotal">
		  </el-pagination>
		</div>

		<!--预览-->
		<el-dialog title="" :visible.sync="dialogFormVisible1" custom-class='phoneSee'>
			<div class='phone'>
				<el-form :model="seeData">
					<h1 class='phonetitle'>{{seeData.title}}</h1>
					<div class='phoneImg'>
						<img src="" alt="" />
					</div>
					<p class="phoneContaint">{{seeData.containt}}</p>
				</el-form>
				<!--<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
				</div>-->
			</div>
		</el-dialog>

		<!--编辑-->
		<el-dialog title="修改资源" :visible.sync="dialogFormVisible">
			<el-form :model="editData">
				<el-form-item label="标题" :label-width="formLabelWidth">
					<el-input v-model="editData.title" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="资源类型" :label-width="formLabelWidth">
					<el-select v-model="editData.type" placeholder="请选择资源类型">
						<el-option label="图文" value="img"></el-option>
						<el-option label="视频" value="video"></el-option>
						<el-option label="纯文字" value="txt"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="抓取时间" :label-width="formLabelWidth">
					<div class="block">
					    <el-date-picker
					      v-model="editData.getTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
				  </div>
				</el-form-item>
				
				<el-form-item label="发布时间" :label-width="formLabelWidth">
					<div class="block">
					    <el-date-picker
					      v-model="editData.putDate"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
				  </div>
				</el-form-item>
				<el-form-item label="封面" :label-width="formLabelWidth">
					<div class='sourceFace'>
						<myUp v-on:getImgUrl="getUrl"></myUp>
					</div>
				</el-form-item>
				  
			</el-form>

			<!--上传封面-->
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import myUp from '@/page/test' //上传组件
	export default {
		data() {
			return {
				dialogFormVisible: false,
				dialogFormVisible1: false,
				formLabelWidth: '120px',
				input1: 'www.baidu.com',
				dataTotal:80,
				seeData: [],
				editData: [],
				tableData: [{
						id: 1,
						title: '招生宝正式上线了！',
						imgurl: '',
						type: '图文',
						getTime: '2016-05-02',
						putDate: '2016-05-02',
						containt: '铼看科技有限公司今晨发布公告“招生宝正式上线”',
						isreleace: 0
					},
					{
						id: 2,
						title: '招生宝正式上线了！',
						imgurl: '',
						type: '图文',
						getTime: '2016-05-02',
						putDate: '2016-05-02',
						containt: '铼看科技有限公司今晨发布公告“招生宝正式上线”',
						isreleace: '1'
					},
					{
						id: 3,
						title: '招生宝正式上线了！',
						imgurl: '',
						type: '图文',
						getTime: '2016-05-02',
						putDate: '2016-05-02',
						containt: '铼看科技有限公司今晨发布公告“招生宝正式上线”',
						isreleace: '0'
					},
					{
						id: 4,
						title: '招生宝正式上线了！',
						imgurl: '',
						type: '图文',
						getTime: '2016-05-02',
						putDate: '2016-05-02',
						containt: '铼看科技有限公司今晨发布公告“招生宝正式上线”',
						isreleace: '1'
					},
					{
						id: 5,
						title: '招生宝正式上线了！',
						imgurl: '',
						type: '图文',
						getTime: '2016-05-02',
						putDate: '2016-05-02',
						containt: '铼看科技有限公司今晨发布公告“招生宝正式上线”',
						isreleace: '1'
					}
				]
			}
		},
		 components: {
		 	myUp:myUp
		 },
		created() {
			this.getlist(1)
		},
		methods: {
			getUrl(data){
				console.log(data)
			},
			//获取列表
			getlist(a,b){
				console.log(11)
//				var arr
//				var size = this.size
//				var that = this
//				this.$https.get('/console-zhaoshengbao/org/getlist', {
//					params: {
//						limit: size,
//						page: a,
//						keywords: b,
//					}
//				}).then(function(resp) {
//					that.totalDatas = resp.data.data.Total.Total
//					that.tableData = resp.data.data.OrgList
//					that.tableData.forEach(item => {
//						if(typeof(item.CreatedAt) == 'string') {
//							var data = new Date(item.CreatedAt)
//							var year = data.getFullYear();
//							var month = data.getMonth() + 1;
//							var day1 = data.getDate();
//							if(month < 10) {
//								month = '0' + month
//							}
//							if(day1 < 10) {
//								day1 = '0' + day1
//							}
//							var newday = year + "." + month + "." + day1
//						}
//						item.CreatedAt = newday;
//						//添加富文本之后的数据渲染
//						if(item.Introduce[0] == '<') {
//							var c = item.Introduce.length
//							arr = item.Introduce.substring(3, c - 4)
//							item.Introduce = arr
//						} else {}
//
//					})
//				}).catch(function(err) {
//					console.log(err);
//				});
			},
			
			//打开预览
			soureceSee(index, row) {
				console.log(index)
				console.log(row)
				this.seeData = row
				this.dialogFormVisible1 = true
			},
			//打开修改
			soureceEdit(index, row) {
				this.editData = row
				this.dialogFormVisible = true
			},
			//修改资源
			editsourece(){
				var id=this.editData.Id
				var that = this
				this.$confirm('是否确认修改?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
//					this.$https.get('' + id).then(function(resp) {
//						console.log(resp)
//						that.dialogFormVisible = false
//						that.getData()
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
//					}).catch(function(err) {
//						console.log(err);
//					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//删除资源
			sourceDel(index, row) {
				var id=row.Id
				var that = this
				console.log(row)
				this.$confirm('是否确认删除该资源?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
//					this.$https.delete('' + id).then(function(resp) {
//						console.log(resp)
//						that.dialogEditVisible = false
//						that.getData()
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
//					}).catch(function(err) {
//						console.log(err);
//					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除操作'
					});
				});
			},
			//发布资源
			sourceShare(index, row) {
//				console.log(index)
//				console.log(row)
				var that=this
				var id=row.Id
				var c = row.isreleace
				if(c == '0') {
					this.$confirm('是否确认发布该资源?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
//						this.$https.delete('' + id).then(function(resp) {
//						console.log(resp)
//						that.dialogEditVisible = false
//						that.getData()
						this.$message({
							type: 'success',
							message: '发布成功!'
						});
//					}).catch(function(err) {
//						console.log(err);
//					});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消发布'
						});
					});
				} else {
					this.$confirm('是否确认取消发布该资源?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
//						this.$https.delete('' + id).then(function(resp) {
//						console.log(resp)
//						that.dialogEditVisible = false
//						that.getData()
						console.log("是")
						this.$message({
							type: 'success',
							message: '取消成功!'
						});
//					}).catch(function(err) {
//						console.log(err);
//					});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						});
					});
				}

			},
			
			
			//发布状态
			change(index, row) {
				var that = this
				if(row.isreleace == '0') {
					console.log("11")
					//		              var parm={
					//		              }
					//		              this.$axios.get('',{params:parm}).then(function(reqs){
					//		
					//		              }).catch(function(err){
					//		                console.log(err)
					//		              })
				}
				if(row.isreleace == '1') {
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
		
			//上传封面部分
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			}

		}
	}
</script>
<style>
.el-pagination{
		margin:0 auto;
	}
	.el-table th {
		text-align: center;
	}
	
	td {
		text-align: center;
	}
	
	.tellme {
		height: 40px;
		float: right;
		margin-top: 10px;
		margin-right: 5%;
	}
	.phoneSee{
		width: 35%;
	}
	.phone{
	width: 400px;
	 padding-top: 60px;
	 margin:0 auto;
	 text-align: center;
	}
	.mycenter{
		width: 30%;
		margin:0 auto;
	}
	
</style>