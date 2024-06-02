<template>
    <el-page-header :icon="ArrowLeft">
        <template #content>
            <span class="head-trip-info">{{ $route.query.fromPlace }} - {{ $route.query.toPlace }}</span>
        </template>
    </el-page-header>
</template>

<script setup>
    import { ArrowLeft } from '@element-plus/icons-vue'
</script>

<style scoped>
    .head-trip-info{
        margin-left :400px;
        font-weight: bold;
        font-size: 15px;
    }
</style>

