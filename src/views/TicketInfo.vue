<template>
    <el-page-header :icon="ArrowLeft" @back="$router.push('/main')">
        <template #content>
            <span class="head-trip-info">{{ $route.query.fromPlace }} - {{ $route.query.toPlace }}</span>
        </template>
    </el-page-header>
</template>

<script setup>
    import { ArrowLeft } from '@element-plus/icons-vue'
    import router from "@/router";
</script>

<style scoped>
    .head-trip-info{
        margin-left :400px;
        font-weight: bold;
        font-size: 15px;
    }
</style>

