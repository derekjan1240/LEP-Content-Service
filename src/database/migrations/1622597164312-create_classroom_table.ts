import {MigrationInterface, QueryRunner} from "typeorm";

export class createClassroomTable1622597164312 implements MigrationInterface {
    name = 'createClassroomTable1622597164312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `classroom` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `name` varchar(50) NOT NULL, `description` varchar(500) NULL, `isAllowAdd` tinyint NOT NULL DEFAULT 1, `manager` varchar(255) NOT NULL, `groupList` varchar(255) NULL, `studentList` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `description` `description` varchar(500) NULL");
        await queryRunner.query("ALTER TABLE `stage` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `stage` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `stage` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_c85f5d8e8daf2966d3f8e982777`");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `stageId` `stageId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `lecture` DROP FOREIGN KEY `FK_434a7daa0735275a30cb5fec85b`");
        await queryRunner.query("ALTER TABLE `lecture` DROP FOREIGN KEY `FK_0e2ac56e947bfae547f611250db`");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `subjectId` `subjectId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `gradeId` `gradeId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `tag` DROP FOREIGN KEY `FK_91af0a4d09db5bc2d945aba7911`");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `unitId` `unitId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `unit` DROP FOREIGN KEY `FK_8b63d0ef9e418853143afa412c5`");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `lectureId` `lectureId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_7bd484db0462ffc66a236c183fb`");
        await queryRunner.query("ALTER TABLE `question` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `question` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `question` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `question` CHANGE `description` `description` varchar(500) NULL");
        await queryRunner.query("ALTER TABLE `question` CHANGE `tagId` `tagId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `choice` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `choice` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `choice` CHANGE `internalComment` `internalComment` varchar(300) NULL");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_c85f5d8e8daf2966d3f8e982777` FOREIGN KEY (`stageId`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lecture` ADD CONSTRAINT `FK_434a7daa0735275a30cb5fec85b` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lecture` ADD CONSTRAINT `FK_0e2ac56e947bfae547f611250db` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tag` ADD CONSTRAINT `FK_91af0a4d09db5bc2d945aba7911` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `unit` ADD CONSTRAINT `FK_8b63d0ef9e418853143afa412c5` FOREIGN KEY (`lectureId`) REFERENCES `lecture`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_7bd484db0462ffc66a236c183fb` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_7bd484db0462ffc66a236c183fb`");
        await queryRunner.query("ALTER TABLE `unit` DROP FOREIGN KEY `FK_8b63d0ef9e418853143afa412c5`");
        await queryRunner.query("ALTER TABLE `tag` DROP FOREIGN KEY `FK_91af0a4d09db5bc2d945aba7911`");
        await queryRunner.query("ALTER TABLE `lecture` DROP FOREIGN KEY `FK_0e2ac56e947bfae547f611250db`");
        await queryRunner.query("ALTER TABLE `lecture` DROP FOREIGN KEY `FK_434a7daa0735275a30cb5fec85b`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_c85f5d8e8daf2966d3f8e982777`");
        await queryRunner.query("ALTER TABLE `choice` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `choice` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `choice` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `question` CHANGE `tagId` `tagId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `question` CHANGE `description` `description` varchar(500) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `question` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `question` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `question` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_7bd484db0462ffc66a236c183fb` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `lectureId` `lectureId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `unit` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `unit` ADD CONSTRAINT `FK_8b63d0ef9e418853143afa412c5` FOREIGN KEY (`lectureId`) REFERENCES `lecture`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `unitId` `unitId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `tag` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `tag` ADD CONSTRAINT `FK_91af0a4d09db5bc2d945aba7911` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `gradeId` `gradeId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `subjectId` `subjectId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `lecture` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `lecture` ADD CONSTRAINT `FK_0e2ac56e947bfae547f611250db` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lecture` ADD CONSTRAINT `FK_434a7daa0735275a30cb5fec85b` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `stageId` `stageId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_c85f5d8e8daf2966d3f8e982777` FOREIGN KEY (`stageId`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `stage` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `stage` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `stage` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `description` `description` varchar(500) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `internalComment` `internalComment` varchar(300) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `lastChangedDateTime` `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `exercise` CHANGE `createDateTime` `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("DROP TABLE `classroom`");
    }

}
