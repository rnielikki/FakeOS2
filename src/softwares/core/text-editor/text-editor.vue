<template>
    <div class="viewer-root">
        <div class="editor" contenteditable="true" ref="content" @input="dataChange">{{ content }}</div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime';
import { WindowOptions } from '@/components/window/components/window-options';
import explorerModal from '@/softwares/core/explorer/explorer-modal'
import AppMenu from './menu'
import windowFactory from '@/components/window/window-factory';
import { OkCancelButton } from '@/components/window/components/dialogs/dialog-model';
import AppValidator from '@/system/app/app-validator'
import GlobalPath from '@/system/filesystem/globalPath';

export default Vue.extend({
    mixins:[ AppValidator(checkType.ifText) ],
    data:function(){
        return {
            title:`Text Editor - ${this.$props?.sender?.name ?? "new file"}`,
            menu:AppMenu(this),
            f_file:this.$props?.sender,
            f_confirmSaving:{
                title:"Save before exit",
                content:"Do you want to leave? really?",
                fileChanged:false
            },
        }
    },
    methods:{
        openFile:function(){
            explorerModal.open(this, this.f_file ?? GlobalPath.Document, (file:FileInfo)=>{
                windowFactory.OpenProgram("core/text-editor", file);
            }, checkType.ifText)
        },
        saveFile:function(){
            let file = this.$data.f_file ?? new FileInfo(".txt", GlobalPath.Document, {content:""});
            file.data.content = (this.$refs.content as HTMLElement).innerText;
            explorerModal.save(this, file,(result:object)=>{
                let ok = Object(result).ok;
                if(ok){
                    this.$data.f_targetWindow.f_title = `Text Editor - ${Object(result).file.name}`
                }
                this.f_confirmSaving.fileChanged = !ok
            });
        },
        dataChange:function(e:Event){
            this.$data.f_confirmSaving.fileChanged = true;
        }
    },
    computed:{
        content:function(){
            return this.$props.sender?.data?.content ?? "";
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.viewer-root {
    flex-grow:1;
}
.editor {
    width:100%;
    height:100%;
    overflow:auto;
    padding:.4rem .7rem;
    color:$content-foreground;
    background-color:$content-background;
    white-space:pre;
}
</style>