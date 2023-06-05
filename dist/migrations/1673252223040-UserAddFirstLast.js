"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddFirstLast1673252223040 = void 0;
class UserAddFirstLast1673252223040 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE user ADD "firstName"
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE user DROP "firstName"
    `);
    }
}
exports.UserAddFirstLast1673252223040 = UserAddFirstLast1673252223040;
//# sourceMappingURL=1673252223040-UserAddFirstLast.js.map