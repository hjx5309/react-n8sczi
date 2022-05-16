import React, { useRef, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs, Button, Divider, Checkbox } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  FastBackwardOutlined,
  StepForwardOutlined,
  FastForwardOutlined,
} from '@ant-design/icons';
const { TabPane } = Tabs;

const CheckboxGroup = Checkbox.Group;

const operations = <Button>Extra Action</Button>;

const options = ['left', 'right'];

const Demo = () => {
  const [position, setPosition] = React.useState(['left', 'right']);

  const tabsDivId = useRef(Math.random());
  // 右箭头点击事件
  const rightButton = (e) => {
    const tabList = document.getElementById(tabsDivId.current).children[0]
      .children[1].children[0];
    const tabsNav = document.getElementById(tabsDivId.current).children[0]
      .children[1];
    // 计算偏移量
    console.log(tabList.clientWidth, tabsNav.clientWidth);
    const offset =
      tabList.children[tabList.children.length - 2].clientWidth / 2;
    // type == 'editable-card'
    //   ? 0
    //   : type == 'card'
    //   ? tabList.children[tabList.children.length - 2].clientWidth / 2
    //   : tabList.children[tabList.children.length - 2].clientWidth;
    if (tabList.clientWidth > tabsNav.clientWidth) {
      const translateX =
        Number(tabList.style.cssText.split('px')[0].split('(')[1]) - 100;
      if (Math.abs(translateX) < tabList.clientWidth - tabsNav.clientWidth) {
        tabList.style.cssText =
          'transform: translate(' + translateX + 'px, 0px);';
      } else {
        tabList.style.cssText =
          'transform: translate(' +
          -(tabList.clientWidth - tabsNav.clientWidth + offset) +
          'px, 0px);';
      }
    }
  };
  const leftButton = (e) => {
    const tabList = document.getElementById(tabsDivId.current).children[0]
      .children[1].children[0];
    const tabsNav = document.getElementById(tabsDivId.current).children[0]
      .children[1];
    if (tabList.clientWidth > tabsNav.clientWidth) {
      const translateX =
        Number(tabList.style.cssText.split('px')[0].split('(')[1]) + 100;
      if (
        Math.abs(translateX) < tabList.clientWidth - tabsNav.clientWidth &&
        translateX < 0
      ) {
        tabList.style.cssText =
          'transform: translate(' + translateX + 'px, 0px);';
      } else {
        tabList.style.cssText = 'transform: translate(' + 0 + 'px, 0px);';
      }
    }
  };
  const OperationsSlot = {
    left: (
      <div style={{ width: '40px', height: '40px' }}>
        {' '}
        <FastBackwardOutlined
          className="tabs-extra-demo-button center"
          onClick={leftButton}
        ></FastBackwardOutlined>
      </div>
    ),
    right: (
      <div style={{ width: '40px', height: '40px' }}>
        <FastForwardOutlined
          className="center"
          onClick={rightButton}
        ></FastForwardOutlined>
      </div>
    ),
  };
  const slot = React.useMemo(() => {
    if (position.length === 0) return null;

    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);

  return (
    <>
      <CheckboxGroup
        options={options}
        value={position}
        onChange={(value) => {
          setPosition(value);
        }}
      />
      <br />
      <br />
      <Tabs
        tabBarExtraContent={slot}
        id={tabsDivId.current}
        tabBarGutter={-18}
        //  renderTabBar={(prop,red)=>{
        //    return  <div class="com com1">文字搜索</div>
        //  }}
      >
        <TabPane tab={<div class="com com1">文字搜索</div>} key="1"></TabPane>
        <TabPane tab={<div class="com com1">首页</div>} key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab={<div class="com com2">文字搜索</div>} key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </>
  );
};

export default Demo;
