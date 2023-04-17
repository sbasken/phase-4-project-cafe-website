"""new table relationships

Revision ID: c1555017122f
Revises: 398e49b5dcfd
Create Date: 2023-04-17 16:35:27.286659

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c1555017122f'
down_revision = '398e49b5dcfd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orderitems', schema=None) as batch_op:
        batch_op.drop_constraint('fk_orderitems_receipt_id_receipts', type_='foreignkey')
        batch_op.drop_column('receipt_id')

    with op.batch_alter_table('receipts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('orderitem_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_receipts_orderitem_id_orderitems'), 'orderitems', ['orderitem_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('receipts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_receipts_orderitem_id_orderitems'), type_='foreignkey')
        batch_op.drop_column('orderitem_id')

    with op.batch_alter_table('orderitems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('receipt_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('fk_orderitems_receipt_id_receipts', 'receipts', ['receipt_id'], ['id'])

    # ### end Alembic commands ###
