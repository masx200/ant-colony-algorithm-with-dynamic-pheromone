# ant-colony-algorithm-without-storing-pheromone

#### 介绍

ant-colony-algorithm-without-storing-pheromone

不存储信息素的蚁群算法.

蚁群算法函数测试

要解决的问题都是旅行商人 TSP(Travelling Salesman Problem)问题,本文的计算两个城市之间的距离的方式都使用欧氏距离,假设所有城市坐标都处于同一个平面之中.

假设有一个旅行商人要拜访 n 个城市，他必须选择所要走的路径，路径的限制是每个城市只能拜访一次，而且最后要回到原来出发的城市。路径的选择目标是要求得的路径路程为所有路径之中的最小值。

#### 软件架构

软件架构说明

1.有限随机 k-opt

2.精准 2-opt 去交叉点

3.贪心算法

4.种群相对信息熵

5.状态转移概率

6.最优路径集合与最新路径集合

7.判断交叉点的方法

8.随机 k-opt 的对象的选择的权重

9.大规模问题部分查找交叉点

10.信息素实时计算机制代替存储信息素和信息素扩散和信息素挥发

#### 安装教程

1.  安装

```
yarn install
```

#### 使用说明

1.  调试

```
yarn dev
```

2.  测试

```
yarn test
```

3.  打包

```
yarn build
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
