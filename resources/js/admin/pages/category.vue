<template>
    <div>
       <div class="content">
			<div class="container-fluid">
				<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
					<p class="_title0">Caterogy <Button @click="addModal = true"><Icon type="md-add" /> Add Category</Button></p>

					<div class="_overflow _table_div">
						<table class="_table">
								<!-- TABLE TITLE -->
							<tr>
								<th>ID</th>
								<th>Tag Name</th>
								<th>Created at</th>
								<th>Action</th>
							</tr>
								<!-- TABLE TITLE -->


								<!-- ITEMS -->
							<tr v-for="(tag,i) in tags" :key="i" v-if="tags.length">
								<td>{{i + 1}}</td>
								<td class="_table_name">{{tag.tagName}}</td>
								<td>{{tag.created_at|formatDate}}</td>
								<td>
                                     <Button type="info" size="small" @click="showEditModal(tag,i)"><Icon type="md-create" /> Edit</Button>
                                     <Button type="error" size="small" @click="showdeletingModal(tag,i)"><Icon type="ios-trash" /> Delete</Button>
								</td>
							</tr>
						</table>
					</div>
				</div>

                <!-- Add modal -->
                <Modal
                    v-model="addModal"
                    title="Add Category"
                    :mask-closable = "false"
                    :closable = "false"
                    >
                    <Input v-model="data.tagName" placeholder="Add Category"/>
                    <div class="space"></div>
                    <Upload
                        type="drag"
                        :headers = "{'x-csrf-token': token,'X-Requested-With': 'XMLHttpRequest'}"
                        :on-success="handleSuccess"
                        :on-error ="handleError"
                        :max-size="2048"
                        :on-exceeded-size="handleMaxSize"
                        action="/app/upload">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>
                    <div slot="footer">
                       <Button type="default" @click="addModal = false">Close</Button>
                        <Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding">{{isAdding?"Adding..":"Add Tag"}}</Button>
                    </div>
                </Modal>
                <!-- Edit modal -->
                  <Modal
                        v-model="editModal"
                        title="Edit Tag"
                        :mask-closable = "false"
                        :closable = "false"
                        >
                        <Input v-model="editdata.tagName" placeholder="Edit Tag Name"/>
                        <div slot="footer">
                        <Button type="default" @click="editModal = false">Close</Button>
                            <Button type="primary" @click="editTag" :disabled="isAdding" :loading="isAdding">{{isAdding?"Editing..":"Edit Tag"}}</Button>
                        </div>
                    </Modal>

                <!-- delete modal -->
                <Modal v-model="deleteModal" width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="ios-information-circle"></Icon>
                        <span>Delete confirmation</span>
                    </p>
                    <div style="text-align:center">
                        <p>Are you sure delete this item ?</p>

                    </div>
                    <div slot="footer">
                        <Button type="default" @click="deleteModal = false">Close</Button>
                        <Button type="error" :loading="isDeleting" :disabled="isDeleting" @click="deleteTag">Delete</Button>
                    </div>
                </Modal>
			</div>
		</div>
    </div>
</template>
<script>
export default {
	data(){
		return{
			data:{
                categoryName:'',
                iconImage: ''
            },
            editdata:{
				tagName:''
			},
            addModal:false,
            editModal:false,
            isAdding:false,
            tags:[],
            index : -1,
            deleteModal:false,
            isDeleting:false,
            deleteItem:{},
            indx:-1,
            token : ''
		}
    },
    methods:{
       async addTag(){
           this.isAdding = true
             if(this.data.tagName.trim() == '') return this.e('Tag Name is required.');
            const res = await this.callApi('post','app/create_tag',this.data)
            console.log(res.status);
            if(res.status ===201){
                this.tags.unshift(res.data)
                this.s('Tag successfully added!')
                this.isAdding = false
                this.addModal = false
                this.data.tagName = ''
            }
            else{
                if(res.status === 422){
                    if(res.data.errors.tagName){
                        this.i(res.data.errors.tagName[0])
                    }
                }
                else{
                this.swr()
                }
            }
        },
        async editTag(){
            this.isAdding = true
            if(this.editdata.tagName.trim() == '') return this.e('Tag Name is required.');
            const res = await this.callApi('post','app/edit_tag',this.editdata)
            console.log(res.status);
            if(res.status ===200){
                this.tags[this.index].tagName = this.editdata.tagName
                this.s('Tag has been edited successfully.')
                this.isAdding = false
                this.editModal = false
            }
            else{
                if(res.status === 422){
                    if(res.data.errors.tagName){
                        this.i(res.data.errors.tagName[0])
                    }
                }
                else{
                this.swr()
                }
            }
        },
      async deleteTag(){
          this.isDeleting = true
            const res = await this.callApi('post','app/delete_tag',this.deleteItem)
            if(res.status===200){
                this.tags.splice(this.indx,1);
                this.s('Tag has been deleted')
            }
            else{
                this.swr()
            }
            this.isDeleting = false
            this.deleteModal = false
        },
        showdeletingModal(tag,index){
            this.deleteModal = true
            this.deleteItem = tag
            this.indx = index
        },
        showEditModal(tag,index){
            let obj = {
                id : tag.id,
                tagName : tag.tagName
            }
            this.editdata = obj
            this.editModal = true
            this.index = index
        },


        handleSuccess (res, file) {
            this.iconImage = res
        },
        handleError (res, file) {
           this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: `${file.errors.file.length ? file.errors.file[0]:'Something went wrong!'}`
            });
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
    },

  async created(){
      this.token = window.Laravel.csrfToken
      this.start()
      const res = await this.callApi('get','app/get_tag')
      if(res.status === 200){
          this.tags = res.data
          this.finish()
      }
      else{
          this.swr()
          this.error()
      }
    }

}
</script>
