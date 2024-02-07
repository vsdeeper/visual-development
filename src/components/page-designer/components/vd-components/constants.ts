/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-03 16:00:47
 * @LastEditTime: 2024-02-07 13:32:39
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description:
 */
import { ShortcutKeyOptionItem } from '../..'

// 容器组件的快捷键
export const SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT: ShortcutKeyOptionItem[] = [
  { keys: ['Delete'] },
  { keys: ['V', 'A'] },
  { keys: ['V', 'D'] }
]

// 一般组件的快捷键
export const SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT: ShortcutKeyOptionItem[] = [
  { keys: ['Delete'] },
  { keys: ['V', 'D'] }
]