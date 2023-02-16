import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'movie_ratings' })
export class MovieRating extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  movie_id!: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false
  })
  rating!: number;
}
