<template>
    <div class="image-collection">
        <div class="image" v-for="file in files" :key="file.name" @click="$emit('image-selected', getPath(file))" :style="getBackgroundImage(file)">
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { DirectoryInfo, FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime'
import FileType from '@/system/filesystem/file-type'
export default Vue.extend({
    data:function(){
        return {
            files:this.path.files.filter(file=>(file.fileType == FileType.File) && checkType.ifImage(file as FileInfo))
        }
    },
    props:{
        path:{
            type:Object as PropType<DirectoryInfo>,
            required:true,
            validator:function(value){
                return !value.disposed
            }
        }
    },
    methods:{
        getBackgroundImage:function(imageFile:FileInfo){
            let path = this.getPath(imageFile);
            if(path){
                return { backgroundImage: 'url(\''+path+'\')' };
            }
            else{
                return {}
            }
        },
        getPath:function(imageFile:FileInfo){
            return Object(imageFile?.data)?.name;
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.image-collection {
    margin: .75rem .75rem .45rem 1.1rem;
    padding: .6rem .4rem;;
    background-color:$content-background;
    border:1px solid $window-button-border;
    display:grid;
    grid-template:repeat(auto-fill, 128px)/repeat(auto-fill, 128px);
    .image {
        position: relative;
        display: inline-block;
        background-size: cover;
    }
}
</style>