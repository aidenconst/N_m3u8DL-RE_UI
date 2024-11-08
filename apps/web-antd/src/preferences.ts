import { useAppConfig } from '@vben/hooks';
import { defineOverridesPreferences } from '@vben/preferences';

const { webTITLE } = useAppConfig(import.meta.env, import.meta.env.PROD);
/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: webTITLE,
    // 是否开启检查更新
    enableCheckUpdates: true,
    // 检查更新的时间间隔，单位为分钟
    checkUpdatesInterval: 1,
  },
  theme: {
    // 主题色
    colorPrimary: '#f74d69',
    // 错误色
    // colorDestructive: 'hsl(348,98%,53%)',
    // 成功色
    // colorSuccess: 'hsl(350,91%,64%)',
    // 警告色
    // colorWarning: 'hsl(350,97%,57%)',
  },
});
