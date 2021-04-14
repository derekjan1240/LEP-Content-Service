import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1618385119217 implements MigrationInterface {
    name = 'initMigration1618385119217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `subject` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `isSyllabus` tinyint NOT NULL DEFAULT 0, `isExam` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `unit` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `lectureId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lecture` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `subjectId` varchar(36) NULL, `gradeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stage` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `grade` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `stageId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `grade_subjects_subject` (`gradeId` varchar(36) NOT NULL, `subjectId` varchar(36) NOT NULL, INDEX `IDX_1d1811a4a1c13a80497ba2bb41` (`gradeId`), INDEX `IDX_5ab19e2d53c5e1b4b8e1ce24fb` (`subjectId`), PRIMARY KEY (`gradeId`, `subjectId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `unit` ADD CONSTRAINT `FK_8b63d0ef9e418853143afa412c5` FOREIGN KEY (`lectureId`) REFERENCES `lecture`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lecture` ADD CONSTRAINT `FK_434a7daa0735275a30cb5fec85b` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lecture` ADD CONSTRAINT `FK_0e2ac56e947bfae547f611250db` FOREIGN KEY (`gradeId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_c85f5d8e8daf2966d3f8e982777` FOREIGN KEY (`stageId`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade_subjects_subject` ADD CONSTRAINT `FK_1d1811a4a1c13a80497ba2bb41b` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade_subjects_subject` ADD CONSTRAINT `FK_5ab19e2d53c5e1b4b8e1ce24fb5` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `grade_subjects_subject` DROP FOREIGN KEY `FK_5ab19e2d53c5e1b4b8e1ce24fb5`");
        await queryRunner.query("ALTER TABLE `grade_subjects_subject` DROP FOREIGN KEY `FK_1d1811a4a1c13a80497ba2bb41b`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_c85f5d8e8daf2966d3f8e982777`");
        await queryRunner.query("ALTER TABLE `lecture` DROP FOREIGN KEY `FK_0e2ac56e947bfae547f611250db`");
        await queryRunner.query("ALTER TABLE `lecture` DROP FOREIGN KEY `FK_434a7daa0735275a30cb5fec85b`");
        await queryRunner.query("ALTER TABLE `unit` DROP FOREIGN KEY `FK_8b63d0ef9e418853143afa412c5`");
        await queryRunner.query("DROP INDEX `IDX_5ab19e2d53c5e1b4b8e1ce24fb` ON `grade_subjects_subject`");
        await queryRunner.query("DROP INDEX `IDX_1d1811a4a1c13a80497ba2bb41` ON `grade_subjects_subject`");
        await queryRunner.query("DROP TABLE `grade_subjects_subject`");
        await queryRunner.query("DROP TABLE `grade`");
        await queryRunner.query("DROP TABLE `stage`");
        await queryRunner.query("DROP TABLE `lecture`");
        await queryRunner.query("DROP TABLE `unit`");
        await queryRunner.query("DROP TABLE `subject`");
    }

}
