<style scoped>

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 600px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    height: 80vh;
  }

  .layout-content-main {
    padding: 20px 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background-color: #fff5e6;
    /*text-align: center;*/
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 30px;
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

</style>

<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu :active-name="setActive" theme="" width="auto" @on-select="routeTo">
          <!--<div class="layout-logo-left">
            &lt;!&ndash;<img src="../assets/logo.png" width="30px" height="30px" >&ndash;&gt;
          </div>-->
          <Submenu name="dashboard">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              控制面板
            </template>
            <Menu-item name="chart1">图形 1</Menu-item>
            <Menu-item name="chart2">图形 2</Menu-item>
            <Menu-item name="chart3">图形 3</Menu-item>
          </Submenu>
          <Submenu name="posts_manager">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              文章管理
            </template>
            <Menu-item name="posts_list">文章列表</Menu-item>
            <Menu-item name="category_list">分类列表</Menu-item>
          </Submenu>
          <Submenu name="setting">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              其它设置
            </template>
            <Menu-item name=""></Menu-item>
            <Menu-item name=""></Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click.native="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>页面</Breadcrumb-item>
            <Breadcrumb-item>{{this.$route.path.replace('/','')}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <transition mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; NSLab
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        spanLeft: 4,
        spanRight: 20,
        page: [
          'about',
          'form',
          'table',
          'markdown-viewer',
          'markdown-editor-1',
          'markdown-editor-2',
          'rtf',
          'upload',
          'echarts'
        ]
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24
      },
      setActive () {
        return this.$route.path.replace('/', '')
      }
    },
    methods: {
      toggleClick () {
        if (this.spanLeft === 4) {
          this.spanLeft = 1
          this.spanRight = 23
        } else {
          this.spanLeft = 4
          this.spanRight = 20
        }
      },
      routeTo (e) {
        this.$router.push(e)
      }
    }
  }

</script>
