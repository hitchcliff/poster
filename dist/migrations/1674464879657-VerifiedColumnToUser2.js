"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedColumnToUser21674464879657 = void 0;
class VerifiedColumnToUser21674464879657 {
    async up(queryRunner) {
        await queryRunner.query(`
        alter table public.user
        add verified bool 
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        alter table public.user
        drop verified 
        `);
    }
}
exports.VerifiedColumnToUser21674464879657 = VerifiedColumnToUser21674464879657;
//# sourceMappingURL=1674464879657-VerifiedColumnToUser2.js.map