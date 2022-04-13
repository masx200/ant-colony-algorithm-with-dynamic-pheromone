<template>
    <table border="1">
        <tr>
            <th v-for="(item, index) of tableheads" :key="index">{{ item }}</th>
        </tr>
        <tr v-for="(item, index) of tablebody" :key="index">
            <td class="wordwrap" v-for="(item2, index2) of item" :key="index2">
                {{ item2 }}
            </td>
        </tr>
    </table>
</template>
<script lang="ts" src="./data_table.ts"></script>
<style scoped>
.wordwrap {
    white-space: normal;

    word-wrap: break-word;

    word-break: break-all;
}
</style>
