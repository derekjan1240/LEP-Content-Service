import {MigrationInterface, QueryRunner} from "typeorm";

export class initContentMigration1617778808713 implements MigrationInterface {
    name = 'initContentMigration1617778808713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `stages` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `units` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `lectureId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lectures` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `subjectId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subjects` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `isSyllabus` tinyint NOT NULL DEFAULT 0, `isExam` tinyint NOT NULL DEFAULT 0, `gradeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `grades` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `stageId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `units` ADD CONSTRAINT `FK_45ce9e91bb7c43bf2213fc044df` FOREIGN KEY (`lectureId`) REFERENCES `lectures`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lectures` ADD CONSTRAINT `FK_f36b84a9e320363b2ca60afea6d` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subjects` ADD CONSTRAINT `FK_8e3d159843d27c348ba1728317b` FOREIGN KEY (`gradeId`) REFERENCES `grades`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grades` ADD CONSTRAINT `FK_6d5251399d245442c793c6543ee` FOREIGN KEY (`stageId`) REFERENCES `stages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `grades` DROP FOREIGN KEY `FK_6d5251399d245442c793c6543ee`");
        await queryRunner.query("ALTER TABLE `subjects` DROP FOREIGN KEY `FK_8e3d159843d27c348ba1728317b`");
        await queryRunner.query("ALTER TABLE `lectures` DROP FOREIGN KEY `FK_f36b84a9e320363b2ca60afea6d`");
        await queryRunner.query("ALTER TABLE `units` DROP FOREIGN KEY `FK_45ce9e91bb7c43bf2213fc044df`");
        await queryRunner.query("DROP TABLE `grades`");
        await queryRunner.query("DROP TABLE `subjects`");
        await queryRunner.query("DROP TABLE `lectures`");
        await queryRunner.query("DROP TABLE `units`");
        await queryRunner.query("DROP TABLE `stages`");
    }

}
