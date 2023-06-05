"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedColumnToUser1674459680808 = void 0;
class VerifiedColumnToUser1674459680808 {
    async up(queryRunner) {
        await queryRunner.query(`
        alter table user
        add verified bool 
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(``);
    }
}
exports.VerifiedColumnToUser1674459680808 = VerifiedColumnToUser1674459680808;
//# sourceMappingURL=1674459680808-VerifiedColumnToUser.js.map