import { createParamDecorator } from '@nestjs/common';
/**
 * @description: 对使用登录策略，获取用户模型策略得到的返回Req中的User进行二次封装装饰器
 * @param date{any} 在使用装饰器后入参，传递在data中
 * @param req{obj} 策略函数成功执行后返回的Req对象
 * @return: 用户对象
 */
export const CurrentUser = createParamDecorator((date, req) => req.user);
