<template>
    <div>
        <div class="oss_file">
            <input type="file" :id="id" :multiple="multiple" @change="doUpload"/>
        </div>
    </div>
</div>
</template>
<script>
	import axios from 'axios'
	
	axios.defaults.baseURL = "http://console-dev.shouboke.tv:8088";
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	axios.defaults.headers.common['Authorization'] = "Basic " + window.btoa("lcq" + ":" + "123");
//	Vue.prototype.$https=axios
	//	axios.get("/console/config/pushpic").then(function(res){
	//			police = res	.data.data;	
	//	})
    export default{
        props:{
            multiple:{
                type: Boolean,
                twoWay:false
            },
            id:{
                type: String,
                twoWay:false
            },
            url:{
                type: Array,
                twoWay:true
            }
        },
        data(){
            return{
                region:'lycpics/',
                bucket:'sbkt.oss-cn-shenzhen.aliyuncs.com/',
            };
        },
        methods:{
            doUpload(){
                const _this = this;
                axios.get("/console/config/pushpic").then((resp) => {
                var result=	resp.data.data
                    const client = new OSS.Wrapper({
                        region: _this.region,
					    accessKeyId: result.OSSAccessKeyId,
					    accessKeySecret:result.signature,
					    stsToken: result.policy,
					    bucket: _this.bucket
                    })
                    const files = document.getElementById(_this.id);
                    if(files.files){
                        const fileLen = document.getElementById(_this.id).files
                        const resultUpload = [];        
                        for (let i = 0; i < fileLen.length; i++) {
                            const file = fileLen[i];
                            const storeAs = file.name;
                            client.multipartUpload(storeAs, file, {

                            }).then((results) => {
                                if(results.url){
                                    resultUpload.push(results.url);
                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                        _this.url = resultUpload;
                    }   
                });
            }
        }
    };
</script>
<style type="text/css">
    .oss_file {
        height: 100px;
        width: 100%;

    }
    .oss_file  input {
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

</style>
