"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser1673838952577 = void 0;
class AddUser1673838952577 {
    async up(queryRunner) {
        await queryRunner.query(`
        
            alter table photo p
            add user

        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
    
    alter table photo
    drop column user
    
    `);
    }
}
exports.AddUser1673838952577 = AddUser1673838952577;
//# sourceMappingURL=1673838952577-AddUser.js.map