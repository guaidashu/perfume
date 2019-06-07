<template>
  <div class="footer__wrap">
    <div class="footer__secondary">
      <div class="footer__inner">
        <div class="footer__region">
          <span>地区：</span>
<!--            下拉选择框-->
          <select class="footer__region__select">
            <option value="en-US">USA</option>
            <option value="zh-CN">China</option>
            <option value="in">UK</option>
        </select>
        </div>
        <div class="footer__secondary__nav">
          <span>Copyright © 2019 Perfume All Rights Reserved.</span>
          <a href="javascript:void(0)">
            关于我们
          </a>
          <a href="javascript:void(0)">
            条款 &amp; 条件
          </a>
          <a href="javascript:void(0)">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavFooter"
  }
</script>
