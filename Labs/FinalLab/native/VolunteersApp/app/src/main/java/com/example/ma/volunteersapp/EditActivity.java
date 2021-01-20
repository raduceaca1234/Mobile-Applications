package com.example.ma.volunteersapp;

import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.Toast;

public class EditActivity extends AppCompatActivity {

    DBHelper helper;
    EditText TxName, TxPhone;
    long id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit);

        helper = new DBHelper(this);

        id = getIntent().getLongExtra(DBHelper.row_id, 0);

        TxName = (EditText)findViewById(R.id.txName_Edit);
        TxPhone = (EditText)findViewById(R.id.txPhone_Edit);

        getData();
    }

    private void getData() {
        System.out.println(id);
        Cursor cursor = helper.oneData(id);
        System.out.println(cursor);
        if(cursor.moveToFirst()){
            String name = cursor.getString(cursor.getColumnIndex(DBHelper.row_name));
            String phone = cursor.getString(cursor.getColumnIndex(DBHelper.row_phone));

            TxName.setText(name);
            TxPhone.setText(phone);
        }
    }

    public boolean onCreateOptionsMenu (Menu menu){
        getMenuInflater().inflate(R.menu.edit_menu, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item){
        switch (item.getItemId()){
            case R.id.save_edit:
                String name = TxName.getText().toString().trim();
                String phone = TxPhone.getText().toString().trim();

                ContentValues values = new ContentValues();
                values.put(DBHelper.row_name, name);
                values.put(DBHelper.row_phone, phone);

                if (name.equals("") && phone.equals("")){
                    Toast.makeText(EditActivity.this, "Nothing to save", Toast.LENGTH_SHORT).show();
                }else {
                    helper.updateData(values, id);
                    int idd = (int)id;
                    Intent newIntent = new Intent();
                    newIntent.putExtra("ID", idd);
                    newIntent.putExtra("NAME", name);
                    newIntent.putExtra("PHONE", phone);
                    setResult(2, newIntent);
                    Toast.makeText(EditActivity.this, "Saved", Toast.LENGTH_SHORT).show();
                    finish();
                }
        }
        switch (item.getItemId()){
            case R.id.delete_edit:
                Cursor cur = helper.oneData(id);
                cur.moveToFirst();
                int idd = (int)id;
                Intent newIntent = new Intent();
                newIntent.putExtra("ID", idd);
                setResult(3, newIntent);
                Intent idvolunteers = new Intent(EditActivity.this, DeleteActivity.class);
                idvolunteers.putExtra(DBHelper.row_id, id);
                startActivityForResult(idvolunteers,3);
                finish();

        }
        return super.onOptionsItemSelected(item);
    }
}
