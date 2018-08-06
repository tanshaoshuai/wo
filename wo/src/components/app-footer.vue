<template>
<div class="app-footer-box">
  <!-- <img src="../assets/logo.png" alt="logo" class="footer-logo"> -->
  <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
  <span class="footer-text">{{appName}}
  &nbsp;官方网站：<a size="mini">{{version}}</a>
  </span>
</div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      author:'谭少',
      version: 'www.shouboke.tv',
      appName: '高考宝管理后台'
    }
  }
}
</script>
<style type="text/css">
  .app-footer-box{
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .app-footer-box .footer-logo{
    width: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .app-footer-box .footer-text{
    color: #8b949e;
  }
</style>
