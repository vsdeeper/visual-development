/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description: logo可视化开发组件
 */
import { BaseDesignData } from '@/components'
import { Component } from 'vue'

export type LogoDesignData = BaseDesignData<{
  name?: string
  color?: string
  height?: string
  fontSize?: string
  suffixIcon?: string | Component
}>;
