"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId1673244975969 = void 0;
class UserId1673244975969 {
    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE "post" ADD "userId"
      `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "post" DROP COLUMN "userId"
            `);
    }
}
exports.UserId1673244975969 = UserId1673244975969;
//# sourceMappingURL=1673244975969-UserId.js.map