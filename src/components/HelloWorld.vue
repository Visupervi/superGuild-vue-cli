<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-people"></i> 管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input style="width: 120px"  v-model="req.keyword"  placeholder="请输入关键字" ></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-button type="primary" icon="add" class="handle-del mr10" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" v-loading = "loading" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="车辆名称" align="center" prop="carName"></el-table-column>
        <el-table-column label="车辆vin识别码" align="center" prop="vin"></el-table-column>
        <el-table-column label="车型平台协议码" align="center" prop="carTypeNum"></el-table-column>
        <el-table-column label="发动机表协议码" align="center" prop="engineNum"></el-table-column>
        <el-table-column label="排量表协议码" align="center" prop="displacementNum"></el-table-column>
        <el-table-column label="变速箱表协议码" align="center" prop="transmissionNum"></el-table-column>
        <el-table-column label="车牌" align="center" prop="brand"></el-table-column>
        <el-table-column label="驾驶员id" align="center"  prop="driverid"></el-table-column>
        <el-table-column label="驾驶员" align="center" prop="driver"></el-table-column>
        <el-table-column label="驾驶员手机号" align="center" prop="mobile"></el-table-column>
        <el-table-column label="创建人" align="center" prop="creater"></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
        <el-table-column label="更新人"  align="center" prop="updater"></el-table-column>
        <el-table-column label="更新时间" align="center"  prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="page.pageSize"
          :current-page="page.pageNo"
          @current-change="handleCurrentChange"
          @size-change = "changePageSize"
          layout="prev, pager, next"
          :total="page.totalRows">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="carManager" :model="carManager" label-width="110px">
        <el-form-item label="车辆名称" prop="carName">
          <el-input v-model.trim="carManager.carName"></el-input>
        </el-form-item>
        <el-form-item label="车辆vin识别码" prop="vin">
          <el-input v-model.trim="carManager.vin"></el-input>
        </el-form-item>
        <el-form-item label="车型平台" prop="type">
          <el-input v-model.trim="carManager.type">
            <el-button slot="append" icon="el-icon-zoom-in" @click="selectCarType"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="发动机机型平台" prop="engine">
          <el-input v-model.trim="carManager.engine">
            <el-button slot="append" icon="el-icon-zoom-in" @click="selectEngine"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="排量" prop="displacement">
          <el-input v-model.trim="carManager.displacement">
            <el-button slot="append" icon="el-icon-zoom-in" @click="selectDisplacement"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="变速箱" prop="transmission">
          <el-input v-model.trim="carManager.transmission">
            <el-button slot="append" icon="el-icon-zoom-in" @click="selectTransmission"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="车牌" prop="brand">
          <el-input v-model.trim="carManager.brand"></el-input>
        </el-form-item>
        <el-form-item label="驾驶员id" prop="driverid">
          <el-input v-model.trim="carManager.driverid"></el-input>
        </el-form-item>
        <el-form-item label="驾驶员" prop="driver">
          <el-input v-model.trim="carManager.driver"></el-input>
        </el-form-item>
        <el-form-item label="驾驶员手机号" prop="mobile">
          <el-input v-model.trim="carManager.mobile"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="creater">
          <el-input v-model.trim="carManager.creater"></el-input>
        </el-form-item>
        <el-form-item label="更新人" prop="updater">
          <el-input v-model.trim="carManager.updater"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" :loading="loading" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 车行平台编辑弹出框 -->
    <el-dialog title="机型平台" :visible.sync="editVisibleCarType" width="30%">
      <el-table :data="tableDataCarType" v-loading = "loading" border class="table" ref="multipleTableCarType" @selection-change="handleSelectionChangeCarType">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="对应的协议码" align="center" prop="typeNum"></el-table-column>
        <el-table-column label="车型平台" align="center" prop="type"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleCarType = false">取 消</el-button>
                <el-button type="primary" :loading="loading" @click="saveEditCarType">确 定</el-button>
            </span>
    </el-dialog>

    <!--发动机机型平台编辑弹出框  -->
    <el-dialog title="机型平台" :visible.sync="editVisibleCarEngine" width="30%">
      <el-table :data="tableDataCarEngine" v-loading="loading" border class="table" ref="multipleTableCarEngine" @selection-change="handleSelectionChangeCarEngine">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="对应的协议码" align="center" prop="typeNum"></el-table-column>
        <el-table-column label="车型平台" align="center" prop="type"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
               <el-button @click="editVisibleCarEngine = false">取 消</el-button>
               <el-button type="primary" :loading="loading" @click="saveEditCarType">确 定</el-button>
           </span>
    </el-dialog>

    <!-- 排量平台编辑弹出框 -->
    <el-dialog title="机型平台" :visible.sync="editVisibleCarDisplacement" width="30%">
      <el-table :data="tableDataCarDisplacement" v-loading="loading" border class="table" ref="multipleTableCarDisplacemen" @selection-change="handleSelectionChangeCarDisplacemen">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="对应的协议码" align="center" prop="typeNum"></el-table-column>
        <el-table-column label="车型平台" align="center" prop="type"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
               <el-button @click="editVisibleCarDisplacement = false">取 消</el-button>
               <el-button type="primary" :loading="loading" @click="saveEditCarType">确 定</el-button>
           </span>
    </el-dialog>
    <!--变速箱平台编辑弹出框-->
    <el-dialog title="机型平台" :visible.sync="editVisibleCarTransmission" width="30%">
      <el-table :data="tableDataCarTransmission" v-loading="loading" border class="table" ref="multipleTableCarTransmission" @selection-change="handleSelectionChangeCarTransmission">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="对应的协议码" align="center" prop="typeNum"></el-table-column>
        <el-table-column label="车型平台" align="center" prop="type"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
               <el-button @click="editVisibleCarTransmission = false">取 消</el-button>
               <el-button type="primary" :loading="loading" @click="saveEditCarType">确 定</el-button>
           </span>
    </el-dialog>


    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import CarManagerApi from '../../api/carmanager/carManager';
  import CarTypeApi from '../../api/vehiclemanager/cartype';
  export default {
    name: 'basetable',
    data() {
      return {
        tableData: [],
        tableDataCarType: [],
        tableDataCarEngine: [],
        tableDataCarDisplacement: [],
        tableDataCarTransmission: [],
        page: {pageNo:1, pageSize: 20},
        multipleSelection: [],
        is_search: false,
        editVisible: false,
        delVisible: false,
        carManager: {},
        idx: -1,
        ids:[],
        req: {},
        accountInput:true,
        loading:false,
        editVisibleCarType:false,
        editVisibleCarEngine:false,
        editVisibleCarDisplacement: false,
        editVisibleCarTransmission: false,
        currentRow:'',
        typeNum:'',

      }
    },
    created() {
      this.getData();
    },
    computed: {

    },
    methods: {
      //实现单选
      handleSelectionChangeCarType(val){
        // console.log("测试："+val.length)
        if( val.length > 1 ){
          this.$refs.multipleTableCarType.clearSelection();
          this.$refs.multipleTableCarType.toggleRowSelection(val.pop());
        }else{
          this.multipleSelection = val.pop();
          // console.dir(this.multipleSelection)
        }
      },

      handleSelectionChangeCarEngine(val) {
        // console.log("测试："+val.length)
        if( val.length > 1 ){
          this.$refs.multipleTableCarEngine.clearSelection();
          this.$refs.multipleTableCarEngine.toggleRowSelection(val.pop());
        }else{
          this.multipleSelection = val.pop();
          // console.dir(this.multipleSelection)
        }
      },
      handleSelectionChangeCarDisplacemen(val) {
        // console.log("测试："+val.length)
        if( val.length > 1 ){
          this.$refs.multipleTableCarDisplacemen.clearSelection();
          this.$refs.multipleTableCarDisplacemen.toggleRowSelection(val.pop());
        }else{
          this.multipleSelection = val.pop();
          // console.dir(this.multipleSelection)
        }
      },
      handleSelectionChangeCarTransmission(val) {
        // console.log("测试："+val.length)
        if( val.length > 1 ){
          this.$refs.multipleTableCarTransmission.clearSelection();
          this.$refs.multipleTableCarTransmission.toggleRowSelection(val.pop());
        }else{
          this.multipleSelection = val.pop();
          // console.dir(this.multipleSelection)
        }
      },
      //弹窗机型平台
      selectCarType(){
        this.getDataCarType();
        this.editVisibleCarType = true;
      },
      //弹出筛选发动机窗口
      selectEngine(){
        this.getDataEngine();
        this.editVisibleCarEngine = true;
      },
      //弹出筛选排量窗口
      selectDisplacement(){
        this.getDisplacement();
        this.editVisibleCarDisplacement = true;
      },
      //弹出筛选变速箱窗口
      selectTransmission(){
        this.getDataTransmission();
        this.editVisibleCarTransmission = true;
      },
      // 获取机型平台列表
      getDataCarType() {
        this.loading = true;
        this.req.currentPage = this.page.pageNo
        this.req.pageSize = this.page.pageSize
        CarTypeApi.getData(this.req).then((res)=>{
          this.loading = false;
          if(res.error===false){
            this.tableDataCarType = res.data.records ? res.data.records : []
            this.page.pageNo = parseInt(res.data.current)
            this.page.totalRows = parseInt(res.data.total)
            this.tableDataCarType.forEach(item => {
              item.frozen = Boolean(item.frozen)
            })
          }
          else{
            this.$message .error(res.msg);
          }
        },(err)=>{
          this.loading = false;
          this.$message .error(err.msg);
        });
      },
      // 获取发动机平台列表
      getDataEngine() {
        this.loading = true;
        this.req.currentPage = this.page.pageNo
        this.req.pageSize = this.page.pageSize
        CarTypeApi.getData(this.req).then((res) => {
          this.loading = false;
          if(res.error===false){
            this.tableDataCarEngine = res.data.records ? res.data.records : []
            this.page.pageNo = parseInt(res.data.current)
            this.page.totalRows = parseInt(res.data.total)
            this.tableDataCarEngine.forEach(item => {
              item.frozen = Boolean(item.frozen)
            })
          }
          else{
            this.$message.error(res.msg);
          }
        },(err) => {
          this.loading = false;
          this.$message.error(err.msg);
        });
      },
      // 获取排量平台列表
      getDisplacement() {
        this.loading = true;
        this.req.currentPage = this.page.pageNo
        this.req.pageSize = this.page.pageSize
        CarTypeApi.getData(this.req).then((res) => {
          this.loading = false;
          if(res.error===false){
            this.tableDataCarDisplacement = res.data.records ? res.data.records : []
            this.page.pageNo = parseInt(res.data.current)
            this.page.totalRows = parseInt(res.data.total)
            this.tableDataCarDisplacement.forEach(item => {
              item.frozen = Boolean(item.frozen)
            })
          }
          else{
            this.$message.error(res.msg);
          }
        },(err) => {
          this.loading = false;
          this.$message.error(err.msg);
        });
      },

      // 获取筛选变速箱平台列表
      getDataTransmission() {
        this.loading = true;
        this.req.currentPage = this.page.pageNo
        this.req.pageSize = this.page.pageSize
        CarTypeApi.getData(this.req).then((res) => {
          this.loading = false;
          if(res.error===false){
            this.tableDataCarTransmission = res.data.records ? res.data.records : []
            this.page.pageNo = parseInt(res.data.current)
            this.page.totalRows = parseInt(res.data.total)
            this.tableDataCarTransmission.forEach(item => {
              item.frozen = Boolean(item.frozen)
            })
          }
          else{
            this.$message.error(res.msg);
          }
        },(err) => {
          this.loading = false;
          this.$message.error(err.msg);
        });
      },

      //点击确定将选中的车型显示在父类页面
      saveEditCarType(){
        // console.dir(this.multipleSelection)
        this.carManager.type = this.multipleSelection.type;
        // console.log("选中的车型："+this.multipleSelection.type)
        //单击确定按钮关闭弹窗
        this.editVisibleCarType = false;
        this.editVisibleCarEngine = false;
        this.editVisibleCarDisplacement = false;
        this.editVisibleCarTransmission = false;
      },


      handleCurrentChange(val) {
        this.page.pageNo = val;
        this.getData();
      },
      changePageSize(value){ // 修改每页条数size
        this.page.pageNo = 1
        this.page.pageSize = value
        this.tableData = null
        this.getData()
      },
      reload() {
        this.page.pageNo = 1
        this.getData()
      },
      // 获取 easy-mock 的模拟数据
      getData() {
        this.loading = true;
        this.req.currentPage = this.page.pageNo
        this.req.pageSize = this.page.pageSize
        CarManagerApi.getData(this.req).then((res)=>{
          this.loading = false;
          if(res.error===false){
            this.tableData = res.data.records ? res.data.records : []
            this.page.pageNo = parseInt(res.data.current)
            this.page.totalRows = parseInt(res.data.total)
            this.tableData.forEach(item => {
              item.frozen = Boolean(item.frozen)
            })
          }
          else{
            this.$message .error(res.msg);
          }
        },(err)=>{
          this.loading = false;
          this.$message .error(err.msg);
        });
      },
      search() {
        this.is_search = true;
        this.getData();
      },

      handleAdd(){
        this.carManager = {};
        this.editVisible = true;
      },
      handleEdit(index, row) {
        this.editVisible = true;
        this.idx = index;
        const item = this.tableData[index];
        this.carManager = item;

      },
      handleDelete(index, row) {
        this.ids = [row.id];
        this.delVisible = true;
      },
      delAll() {
        this.delVisible = true;
        this.ids = [];
        const length = this.multipleSelection.length;
        for (let i = 0; i < length; i++) {
          this.ids.push(this.multipleSelection[i].id);
        }

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 保存编辑
      saveEdit() {
        // this.$set(this.tableData, this.idx, this.carManager);
        this.loading = true
        CarManagerApi.save(this.carManager).then((res) => {
          this.loading = false
          if (res.error === false) {
            this.editVisible = false
            this.$message .success(res.msg);
            this.reload()
          } else {
            this.$message .error(res.msg);
          }
        }, (err) => {
          this.loading = false
          this.$message .error(err.msg);
        })

      },
      // 确定删除
      deleteRow(){
        CarManagerApi.batchDelete(this.ids).then((res) => {
          if(res.error===false){
            this.$message .success(res.msg);
            this.reload()
          }
          else{
            this.$message .error(res.msg);
          }

        }, (err) => {
          this.$message .error(err.msg);
        })
        this.delVisible = false;
      },


    }
  }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .table{
    width: 100%;
    font-size: 14px;
  }
  .red{
    color: #ff0000;
  }
</style>
