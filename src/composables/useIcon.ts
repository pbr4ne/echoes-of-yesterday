import { h, Component } from 'vue';
import { NIcon } from 'naive-ui';

export function renderIcon(icon: Component, color?: string) {
  return () => h(NIcon, { color: color || undefined }, { default: () => h(icon) });
}
