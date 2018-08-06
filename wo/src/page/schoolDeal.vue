<template>
	<div class='boxBody'>
		<h1>院校维护</h1>
		<div>
			<div class="addSchool">
				<el-button type="primary" @click="addSchool()">新增机构</el-button>
			</div>
			<div class='school_serch'>
				<el-input v-model="input" placeholder="请输入内容" /><span @click="search()">搜索</span>
			</div>
		</div>

		<div class='schoolTable'>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="院校名称">
								<span>{{ props.row.OrgName }}</span>
							</el-form-item>
							<el-form-item label="头像">
								<!--<span>{{ props.row.Logo }}</span>-->
								<img :src="props.row.Logo" class="schoolLogo" alt="" />
							</el-form-item>
							<el-form-item label="助手">
								<!--<span>{{ props.row.OrgName }}</span>-->
								<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="helpSee(props.row.Id)">查看助手</el-button>
								</template>
							</el-form-item>
							<el-form-item label="注册时间">
								<span>{{ props.row.CreatedAt }}</span>
							</el-form-item>
							<el-form-item label="院校简介">
								<span>{{ props.row.Introduce }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="院校名称" prop="OrgName">
				</el-table-column>
				<el-table-column label="注册时间" prop="CreatedAt">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="soureceSee(scope.$index, scope.row)">获取主页地址</el-button>
						<el-button size="mini" type="danger" @click="sourceDel(scope.$index, scope.row)">删除</el-button>
						<el-button size="mini" type="primary" @click="soureceEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="sourceAddHelp(scope.$index, scope.row)">增加助手</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="block">
				<el-pagination layout="prev, pager, next" :total="totalDatas" @current-change="currentPage">
				</el-pagination>
			</div>
		</div>

		<!--新增-->
		<el-dialog title="新增机构" :visible.sync="dialogAddVisible">
			<el-form :model="addSchoolData">
				<el-form-item label="标题" :label-width="formLabelWidth">
					<el-input v-model="addSchoolData.schoolName" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="上传头像" :label-width="formLabelWidth">
					<!--<div class='sourceFace'>
						<img src="" alt="" />
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="5" :on-exceed="handleExceed">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</div>-->
					<el-input v-model="addSchoolData.schoolImg" auto-complete="off"></el-input>
				</el-form-item>

				<!--富文本编辑器-->
				<el-form-item label="内容" :label-width="formLabelWidth">
					<quill-editor v-model="addSchoolData.schoolDetail" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)">
					</quill-editor>
				</el-form-item>

			</el-form>

			<!--上传头像-->
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSure()">确 定</el-button>
			</div>
		</el-dialog>

		<!--编辑-->
		<el-dialog title="编辑机构" :visible.sync="dialogEditVisible">
			<el-form :model="editSchoolData">
				<el-form-item label="标题" :label-width="formLabelWidth">
					<el-input v-model="editSchoolData.OrgName" auto-complete="off"></el-input>
				</el-form-item>
				<!--上传头像-->
				<el-form-item label="上传头像" :label-width="formLabelWidth">
					<el-input v-model="editSchoolData.Logo" auto-complete="off"></el-input>
					<!--<img :src="editSchoolData.Logo" alt="" class="schoolLogo" />-->

				</el-form-item>
				<el-form-item label="内容" :label-width="formLabelWidth">
					<el-input v-model="editSchoolData.Introduce" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditVisible = false">取 消</el-button>
				<el-button type="primary" @click="editSure()">确 定</el-button>
			</div>
		</el-dialog>

		<!--添加助手-->
		<el-dialog title="添加助手" :visible.sync="dialogHelpVisible">
			<el-form :model="helpSchoolData">
				<el-form-item label="手机号码" :label-width="formLabelWidth">
					<el-input v-model="helpSchoolData.phone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogHelpVisible = false">取 消</el-button>
				<el-button type="primary" @click="AddHelpSure()">确 定</el-button>
			</div>
		</el-dialog>

		<!--查看助手-->
		<el-dialog title="查看助手" :visible.sync="dialogHelpListVisible">
			<el-table :data="helpListData" height="250" border style="width: 100%">
				<el-table-column label="昵称" width="">
					<template scope="scope">
						<el-input v-model="scope.row.Phone" auto-complete="off" :class="{'Name':isShow}" :disabled='isShow'></el-input>
					</template>
				</el-table-column>

				<el-table-column prop="DisplayName" label="电话" width="">
				</el-table-column>
				<el-table-column label="头像" width="">
					<template scope="scope">
						<div>
							<img :src="scope.row.AvatarUrl" width="50px" alt="" />
							<!--<span :class='helpDeil:isShow'>上传</span>-->
						</div>

					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="helpDel(scope.$index, scope.row)">移除助手</el-button>
						<el-button size="mini" type="primary" @click="helpEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>

			</el-table>
			<!--</el-form>-->

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogHelpListVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script type="text/javascript" charset="UTF-8">
	export default {
		data() {
			return {
				isShow: true, //是否可编辑助手
				editFid: "",
				editorOption: {
					placeholder: '请输入院校简介',
					theme: 'snow', // or 'bubble'
					modules: {}
				},
				totalDatas: 100, //分页总条数
				size: 10, //每页显示条数

				input: '',
				formLabelWidth: '120px',
				dialogEditVisible: false,
				dialogAddVisible: false,
				dialogHelpVisible: false,
				dialogHelpListVisible: false,
				addSchoolData: {
					schoolName: '',
					schoolImg: '',
					schoolDetail: '',
					registerDate: '',
					isreleace: 0
				},
				helpSchoolData: {
					id: '',
					phone: ''
				},
				helpListData: [],
				editSchoolData: {},
				tableData: []
			}
		},
		created() {
			this.getData(1)
		},
		methods: {
			//获取数据包
			getData(a, b) {
				var arr = ''
				var size = this.size
				var that = this
				this.$https.get('/console-zhaoshengbao/org/getlist', {
					params: {
						limit: size,
						page: a,
						keywords: b,
					}
				}).then(function(resp) {
					that.totalDatas = resp.data.data.Total.Total
					that.tableData = resp.data.data.OrgList
					that.tableData.forEach(item => {
						if(typeof(item.CreatedAt) == 'string') {
							var data = new Date(item.CreatedAt)
							var year = data.getFullYear();
							var month = data.getMonth() + 1;
							var day1 = data.getDate();
							if(month < 10) {
								month = '0' + month
							}
							if(day1 < 10) {
								day1 = '0' + day1
							}
							var newday = year + "." + month + "." + day1
						}
						item.CreatedAt = newday;
						//添加富文本之后的数据渲染
						if(item.Introduce[0] == '<') {
							var c = item.Introduce.length
							arr = item.Introduce.substring(3, c - 4)
							item.Introduce = arr
						} else {}

					})
				}).catch(function(err) {
					console.log(err);
				});
			},
			//			新增显示
			addSchool() {
				this.dialogAddVisible = true
			},
			//新增
			addSure() {
				var that = this
				console.log(that.addSchoolData.schoolImg)
				let postData = {
					logo: that.addSchoolData.schoolImg,
					orgname: that.addSchoolData.schoolName,
					introduce: that.addSchoolData.schoolDetail
				}
				console.log(postData)
				this.$confirm('是否确认添加?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$https.post('/console-zhaoshengbao/org/create', postData).then(function(resp) {
						that.dialogAddVisible = false
						that.getData()
						this.$message({
							type: 'success',
							message: '添加成功!'
						});
					}).catch(function(err) {
						console.log(err);
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});

			},
			soureceEdit(index, row) {
				this.dialogEditVisible = true
				this.editSchoolData = row
			},
			editSure() {
				var id = this.editSchoolData.Id
				var that = this
				console.log(that.editSchoolData.schoolImg)
				let postData = {
					logo: that.editSchoolData.Logo,
					orgname: that.editSchoolData.OrgName,
					introduce: that.editSchoolData.Introduce
				}
				console.log(postData)
				this.$confirm('是否确认修改?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$https.put('/console-zhaoshengbao/org/editorg/' + id, postData).then(function(resp) {
						console.log(resp)
						that.dialogEditVisible = false
						that.getData()
						this.$message({
							type: 'success',
							message: '修改成功'
						});
					}).catch(function(err) {
						console.log(err);
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除操作'
					});
				});
			},
			//			助手新增
			sourceAddHelp(index, row) {
				this.dialogHelpVisible = true
				console.log(row.Id)
				this.helpSchoolData.id = row.Id
			},
			AddHelpSure() {
				var that = this
				var id = this.helpSchoolData.id
				var phone = this.helpSchoolData.phone
				var exe = /(^1[3|5|8|4|7][0-9]{9}$)/;
				if(exe.test(phone)) {
					this.$confirm('是否确认添加?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$https.put('/console-zhaoshengbao/org/setUserInOrg?orgid=' + id + '&phone=' + phone).then(function(resp) {
							console.log(resp)
							that.dialogHelpVisible = false
							this.$message({
								type: 'success',
								message: '添加成功!'
							});
						}).catch(function(err) {
							console.log(err);
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						});
					});
				} else {
					alert('这不是一个手机号码！请重新输入')
				}

			},
			//助手查看
			helpSee(index) {
				this.dialogHelpListVisible = true
				var that = this
				var id = index
				this.editFid = id
				this.$https.get('/console-zhaoshengbao/org/getOrgUser?orgid=' + id).then(function(resp) {
					console.log(resp)
					that.helpListData = resp.data.data
					that.helpListData.faId = id
					//						that.dialogHelpListVisible = false
					//						that.getData()
				}).catch(function(err) {
					console.log(err);
				});

			},
			//移除助手
			helpDel(index, row) {
				//				console.log(row)
				var that = this
				var uid = row.Id
				var id = this.editFid
				//				console.log(this.editFid)
				this.$https.delete('/console-zhaoshengbao/org/pushUserOffOrg?orgid=' + id + '&uid=' + uid).then(function(resp) {
					console.log(resp)
					//					that.helpListData=resp.data.data
					//						that.dialogHelpListVisible = false
					that.helpSee(id)
				}).catch(function(err) {
					console.log(err);
				});

			},
			helpEdit(){
				cosole.log(111)
				this.isShow=false
			},
			//发布状态
			change(index, row) {
				var that = this
				if(row.isreleace == 0) {
					console.log("11")
					//		              var parm={
					//		              }
					//		              this.$axios.get('',{params:parm}).then(function(reqs){
					//		
					//		              }).catch(function(err){
					//		                console.log(err)
					//		              })
				}
				if(row.isreleace == 1) {
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
			soureceSee(index, row) {
				console.log(row)
				console.log(index)
			},
			//		        删除资源
			sourceDel(index, row) {
				var that = this
				console.log(row)
				var id = row.Id
				this.$confirm('是否确认删除该资源?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//调用接口
					var that = this
					this.$https.delete('/console-zhaoshengbao/org/deleteorg/' + id).then(function(resp) {
						console.log(2345)
						that.getData()
						this.$message({
							type: 'success',
							message: '删除成功!'
						});

					}).catch(function(err) {
						console.log(err);
					});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除操作'
					});
				});
			},

			//上传头像部分
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
			},
			//富文本
			onEditorChange({
				editor,
				html,
				text
			}) { //内容改变事件
				console.log("---内容改变事件---")
				//	        this.content = html
				console.log(this.addSchoolData.schoolDetail)
			},
			//分页
			currentPage: function(currentPage) {
				console.log(currentPage)
				this.getData(currentPage)
			},
			search() {
				console.log(this.input)
				this.getData(1, this.input)
			}

		}
	}
</script>
<style>
	.schoolLogo {
		width: 150px;
	}
	
	.addSchool {
		margin-left: 5%;
		float: left;
	}
	
	.school_serch {
		width: 20%;
		margin-right: 5%;
		float: right;
	}
	
	.schoolTable {
		clear: both;
		padding-top: 15px;
	}
	
	.el-table th {
		text-align: center;
	}
	
	td {
		text-align: center;
	}
	
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100%;
		text-align: left;
	}
	
	.Name {
		border: none;
	}
	
	.el-input.is-disabled .el-input__inner {
		/*background-color: #f5f7fa; 
     border-color: #e4e7ed; 
     color: #c0c4cc; 
     cursor: not-allowed; */
		background-color: rgba(000, 000, 000, 0);
		border-color: rgba(000, 000, 000, 0);
		color: rgba(000, 000, 000, .8);
		cursor: none;
	}
	
	.helpDeil {
		display: none;
	}
</style>