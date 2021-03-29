import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1616975330843 implements MigrationInterface {
    name = 'initMigration1616975330843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `grades` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lectures` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stages` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subjects` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, `isSyllabus` tinyint NOT NULL DEFAULT 0, `isExam` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `units` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `isArchived` tinyint NOT NULL DEFAULT 0, `createDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `createdBy` varchar(300) NOT NULL, `lastChangedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), `lastChangedBy` varchar(300) NOT NULL, `internalComment` varchar(300) NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `units`");
        await queryRunner.query("DROP TABLE `subjects`");
        await queryRunner.query("DROP TABLE `stages`");
        await queryRunner.query("DROP TABLE `lectures`");
        await queryRunner.query("DROP TABLE `grades`");
    }

}
