<template>
    <div v-contextMenu="{ value: value }" :class="['f_collection-icon', { selected:isSelected, small:small }]"
    @mousedown="$emit('selected')" @dragstart="dragging" @dragend="dragged" @drop="dropped" @dragover.prevent>
        <div class="image-wrapper">
            <img class="icon-image" :src="model.icon" draggable="false" />
            <img :src="shortcutImage" class="shortcut" v-if="model.isShortcut" />
        </div>
        <div class="f_collection-icon-label" :contenteditable="editable" @mousedown.stop ref="label">{{ model.label }}</div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import ContextMenu from '@/components/menu/contextmenu'
import WindowFactory from '@/components/window/window-factory'
import IconModel from './models/icon-model'
import backgroundMenu from '@/components/background/background-menu'
import { DirectoryInfo, FileInfo, ShortcutInfo } from '@/system/filesystem/fileinfo'
import IconMenu from './icon-menu'
import IconGlobal from './models/icon-global'
import FileType from '@/system/filesystem/file-type'

export default Vue.extend({
    name:"Icon",
    directives:{ ContextMenu },
    mixins: [ IconMenu ],
    props:{
        model:{
            type:Object as PropType<IconModel>
        },
        isSelected:{
            type:Boolean,
            default:false
        },
        small:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        shortcutImage:function(){
            return require('./shortcut.png');
        }
    },
    methods:{
        dragging:function(){
            (this.$el as HTMLElement).style.opacity = "0.5"
        },
        dragged:function(e:Event){
            (this.$el as HTMLElement).style.opacity = "1"
            this.dragToApp(e);
            if(IconGlobal.dropTarget){
                IconGlobal.dropTarget = null;
            }
        },
        dropped:function(e:Event){
            IconGlobal.dropTarget = this.model.fileInfo;
            e.stopPropagation()
        },
        dragToApp:function(e:Event){
            if(this.$props.model.fileInfo == IconGlobal.dropTarget) return;
            let _target = (IconGlobal.dropTarget?.fileType == FileType.Shortcut)?
                (IconGlobal.dropTarget as ShortcutInfo).originalFile
                :IconGlobal.dropTarget;
            let _fileInfo = (this.$props.model.fileInfo.fileType == FileType.Shortcut)?
                this.$props.model.fileInfo.originalFile
                :this.$props.model.fileInfo;

            switch(_target?.fileType) {
                case FileType.Directory:
                    if(this.$props.model.fileInfo !== _target) {
                        (this as any).move(_target);
                    }
                    break;
                case FileType.File:
                    var data = _fileInfo.data;
                    var appName = ((_target as FileInfo)?.data as any)?.app;
                    if(!appName
                    || !data
                    || (_target as FileInfo)?.appType.typeName !== "application/vue"
                    || appName !== _fileInfo?.appType?.app) {
                        return;
                    }
                    WindowFactory.OpenProgram(appName, _fileInfo, data);
                    break;
            }
            e.stopPropagation();
        }
    }
})
</script>
<style lang="scss" scoped>
.f_collection-icon {
    @import 'src/scss/colorset.scss';
    position:relative;
    display:inline-block;
    text-align:center;
    &-label {
        overflow-wrap: anywhere;
        &[contenteditable=true]{
            background-color:$content-background;
            color:$content-foreground;
            border:1px solid $content-foreground;
            text-shadow:none;
        }
    }
    &.selected {
        background-color:$selected-background;
        .f_collection-icon-label {
            color:$selected-foreground;
            height:auto;
        }
    }
    &:not(.selected){
        .f_collection-icon-label{
            overflow-y:hidden;
            height:1rem;
        }
    }
}
.f_collection-icon:not(.small) {
    width: 5.1em;
    .icon-image {
        width:64px;
        height:64px;
    }
    &-label {
        font-size:1rem;
    }
}
.f_collection-icon.small {
    width: 3.55rem;
    .icon-image {
        width:36px;
        height:36px;
    }
    .f_collection-icon-label {
        font-size:0.8rem;
    }
}
.image-wrapper {
    position:relative;
    .shortcut {
        width:38.2%;
        height:auto;
        position:absolute;
        bottom:0;
        lefT:0;
    }
}
</style>