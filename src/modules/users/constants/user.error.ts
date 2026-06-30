import { HttpStatus } from "@nestjs/common"
export const UserError = {
    USER_NOT_FOUND: {
        code: 'USER.USER_NOT_FOUND',
        message: 'Không tìm thấy người dùng',
        statusCode: HttpStatus.NOT_FOUND,
    },

} as const