<template>
    <div class="root">
        <h1><clock class="f_clockdate-clock" /></h1>
        <div>{{ day }}</div>
        <calendar />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Clock from '@/components/ui-components/datetime/clock.vue'
import SystemClock from '@/system/time/current'
import ClockFormatter from '@/system/time/formatter'
import Calendar from '@/components/ui-components/datetime/calendar.vue'

export default Vue.extend({
    components: { Clock, Calendar },
    data:function(){
        return {
            title:"Time settings"
        }
    },
    computed:{
        day:function(){
            return ClockFormatter.getDayFormat(SystemClock.currentDate)
        }
    }
})
</script>
<style scoped>
.root {
    padding:2.7rem;
    text-align:center;
}
</style>