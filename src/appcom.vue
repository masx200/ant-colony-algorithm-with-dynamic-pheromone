<template>
    <div :class="{ 'container-top': navbar_float }">
        <Progress_element
            :class="{ 'fixed-top-navbar': navbar_float }"
            :percentage="percentage"
            :indeterminate="indeterminate"
            v-show="show_progress"
        />
        <h1>自适应+蚁群+k-opt+动态计算信息素-TSP-测试</h1>
        <hr />
        <span>选择城市地图</span>
        <select
            ref="selecteleref"
            :disabled="disablemapswitching"
            @change="submit_select_node_coordinates"
        >
            <option
                v-for="item in TSP_cities_data"
                v-bind:key="item"
                :value="item"
            >
                {{ item }}
            </option>
        </select>
        <br />
        <button v-text="'重置'" @click="resethandler" /><br />
        <button
            v-text="'停止'"
            @click="stop_handler"
            :disabled="disable_stop"
        />
        <hr />
        <span v-text="'显示进度条'"></span>
        <el-switch
            v-model="show_progress"
            active-text="Open"
            inactive-text="Close"
        />
        <hr />
        <details
            class="width-100-percent"
            :open="show_configurations"
            @toggle="show_configurations = $event.target.open"
        >
            <summary>蚁群的参数配置</summary>
            <span>结果四舍五入</span>
            <el-radio-group
                v-model="round_result"
                :disabled="disablemapswitching"
            >
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio> </el-radio-group
            ><br />
            <hr />

            <span>最优路径的集合最大大小</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="
                    input_options.max_size_of_collection_of_optimal_routes
                "
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br />
            <!-- <span>最新路径的集合最大大小</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="
                    input_options.max_size_of_collection_of_latest_routes
                "
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br /> -->
            <span>状态转移规则的每步最多城市数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_cities_of_state_transition"
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br />
            <span>贪心算法的每步最多城市数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_cities_of_greedy"
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br />
            <span>查找交叉点的最大线段数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_segments_of_cross_point"
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br />
            <span>贪心算法路径数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="max_routes_of_greedy"
                :disabled="disablemapswitching"
                :min="2"
                :controls="false"
            /><br /><span>每条的k-opt最大数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_results_of_k_opt"
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br />
            <span>每条的k-exchange最大次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_results_of_k_exchange"
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br /><span>每条的2-opt最大次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_results_of_2_opt"
                :disabled="disablemapswitching"
                :min="1"
                :controls="false"
            /><br />

            <span>蚂蚁数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="count_of_ants_ref"
                :disabled="disablemapswitching"
                :min="2"
                :controls="false"
            /><br />
            <span>信息素因子</span>
            <el-input-number
                :controls="false"
                step-strictly
                :step="0.001"
                v-model.number="alpha"
                :disabled="disablemapswitching"
                :min="0.001"
                :max="5"
            /><br />
            <span>启发式因子</span>
            <el-input-number
                :controls="false"
                step-strictly
                :step="0.001"
                v-model.number="beta"
                :disabled="disablemapswitching"
                :min="0.001"
                :max="10"
            /><br />
        </details>

        <hr />
        <span>按照终止条件</span>
        <el-radio-group
            v-model="radio_run_way"
            :disabled="!can_run || is_running"
        >
            <el-radio :label="run_way_time">时间</el-radio>
            <el-radio :label="run_way_round">轮次</el-radio>
        </el-radio-group>
        <div v-show="radio_run_way === run_way_round">
            <span>迭代轮次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="searchrounds"
                :min="1"
                :controls="false"
                :disabled="!can_run || is_running"
            />
            <br />
            <button
                v-text="'运行'"
                @click="create_and_run_tsp_by_search_rounds"
                :disabled="!can_run || is_running"
            />
        </div>
        <div v-show="radio_run_way === run_way_time">
            <span>迭代时间秒</span>
            <el-input-number
                step-strictly
                :step="0.001"
                v-model.number="search_time_seconds"
                :min="0.001"
                :controls="false"
                :disabled="!can_run || is_running"
            />
            <br />
            <button
                v-text="'运行'"
                @click="create_and_run_tsp_by_search_time"
                :disabled="!can_run || is_running"
            />
        </div>
        <hr />

        <div class="chartcontainer" style="">
            <details
                class="width-100-percent"
                :open="show_routes_of_best"
                @toggle="show_routes_of_best = $event.target.open"
            >
                <summary>全局最优路径的展示</summary>
                <!-- 全局最优解的图 -->
                <LineChart
                    class="singlechart"
                    style=""
                    :options="options_of_best_route_chart"
                ></LineChart>
            </details>

            <!-- 最近一条路径的图 -->
        </div>
        <hr />
        <!-- <details
            class="width-100-percent"
            :open="show_routes_of_latest"
            @toggle="show_routes_of_latest = $event.target.open"
        >
            <summary>最近一条路径的展示</summary>
            <LineChart
                class="singlechart"
                style=""
                :options="options_of_latest_route_chart"
            ></LineChart>
        </details>

        <hr /> -->
        <details
            class="width-100-percent"
            :open="show_chart_of_latest"
            @toggle="show_chart_of_latest = $event.target.open"
        >
            <summary>迭代次数和相对信息熵</summary>
            <div class="chartcontainer" style="">
                <!-- 路径序号和当前路径长度的图表 -->
                <LineChart
                    class="singlechart"
                    style=""
                    :options="
                        options_of_iterations_and_information_entropy_chart
                    "
                ></LineChart>
                <!-- 路径序号和最优路径长度的图表 -->
            </div>
        </details>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_entropy"
            @toggle="show_chart_of_entropy = $event.target.open"
        >
            <summary>路径序号和当前路径长度</summary>
            <div class="chartcontainer" style="">
                <!-- 迭代轮次和相对信息熵的图表 -->
                <LineChart
                    class="singlechart"
                    style=""
                    :options="options_of_current_path_length_chart"
                ></LineChart>
            </div>
        </details>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_best"
            @toggle="show_chart_of_best = $event.target.open"
        >
            <summary>路径序号和最优路径长度</summary>
            <LineChart
                class="singlechart"
                style=""
                :options="options_of_best_path_length_chart"
            ></LineChart>
        </details>
        <hr />

        <!-- //汇总结果 -->
        <Data_table
            :tableheads="summary_best_TableHeads"
            :tablebody="summary_best_TableBody"
        />
        <!-- 拆分表格 -->
        <hr />
        <Data_table
            :tableheads="summary_total_TableHeads"
            :tablebody="summary_total_TableBody"
        />
        <!-- 拆分表格 -->
        <hr />
        <details
            class="width-100-percent"
            :open="show_array_routes_of_best"
            @toggle="show_array_routes_of_best = $event.target.open"
        >
            <summary>最优路径的数组展示</summary>
            <Data_table
                :tableheads="global_best_routeHeads"
                :tablebody="global_best_routeBody"
            />

            <hr />
        </details>
        <details
            class="width-100-percent"
            :open="show_history_routes_of_best"
            @toggle="show_history_routes_of_best = $event.target.open"
        >
            <summary>最优路径的变化历史</summary>
            <Data_table
                :tableheads="TableHeadsOfHistoryOfBest"
                :tablebody="TableBodyOfHistoryOfBest"
            />
            <hr />
        </details>
        <!-- <details class="width-100-percent" :open="true">
            <summary>贪心路径的统计</summary> -->
        <Data_table
            :tableheads="greedy_iteration_table_heads"
            :tablebody="greedy_iteration_table_body"
        />
        <!-- </details> -->
        <hr />
        <details
            class="width-100-percent"
            :open="show_summary_of_iterations"
            @toggle="show_summary_of_iterations = $event.target.open"
        >
            <summary>每次迭代的统计</summary>
            <!-- 迭代结果 -->
            <Data_table
                :tableheads="oneiterationtableheads"
                :tablebody="oneiterationtablebody"
            />
        </details>
        <hr />
        <!-- <details
            v-if="show_every_route"
            class="width-100-percent"
            :open="show_summary_of_routes"
            @toggle="show_summary_of_routes = $event.target.open"
        >
            <summary>每条路径的统计</summary>
路径结果 -->
        <!-- <Data_table
                :tableheads="oneroutetableheads"
                :tablebody="oneroutetablebody"
            />
        </details> -->
        <!-- -->
    </div>
</template>
<script lang="ts" src="./appcom.ts"></script>
<style scoped>
.fixed-top-navbar {
    z-index: 10;
    /* height: 30px; */
    position: fixed;
    /* width: 100%; */
    top: 0%;
    left: 0;
}
.singlechart {
    min-height: 300px;
    max-width: 100%;
    width: 100%;
    min-width: 300px;
    /* max-height: 100%; */
    height: 600px;
}
.chartcontainer {
    max-width: 100%;
    display: flex;
    max-height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
}
@media screen and (max-width: 1000px) {
    /* 小于1000 */
    .chartcontainer {
        flex-direction: column;
    }
}
/* 小于600 */
@media screen and (max-width: 400px) {
    .singlechart {
        max-height: 400px;
        height: 400px;
    }
}
@media screen and (max-width: 500px) {
    .singlechart {
        height: 500px;
        max-height: 500px;
    }
}
@media screen and (max-width: 600px) {
    .singlechart {
        height: 600px;
        max-height: 600px;
    }
}
/* 大于600 */
@media screen and (min-width: 600px) {
    .singlechart {
        max-height: 600px;
    }
}
/* 大于1000 */
@media screen and (min-width: 1000px) {
    .chartcontainer {
        flex-direction: row;
    }
}
.container-top {
    margin-top: 30px;
}

.width-100-percent {
    width: 100%;
}
</style>
