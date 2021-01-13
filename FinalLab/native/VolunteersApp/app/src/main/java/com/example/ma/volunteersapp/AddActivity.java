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

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Random;

public class AddActivity extends AppCompatActivity {

    DBHelper helper;
    EditText TxName, TxPhone;
    long id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add);

        helper = new DBHelper(this);

        id = getIntent().getLongExtra(DBHelper.row_id, 0);

        TxName = (EditText) findViewById(R.id.txName_Add);
        TxPhone = (EditText) findViewById(R.id.txPhone_Add);
    }

    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.add_menu, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.save_add:
                String name = TxName.getText().toString().trim();
                String phone = TxPhone.getText().toString().trim();
                Random rand = new Random();
                //int id = rand.nextInt(1000);

                //Get Date
                Calendar calendar = Calendar.getInstance();
                SimpleDateFormat simpleDate = new SimpleDateFormat("MMM dd, yyyy");
                String created = simpleDate.format(calendar.getTime());

                ContentValues values = new ContentValues();
                values.put(DBHelper.row_name, name);
                values.put(DBHelper.row_phone, phone);
                values.put(DBHelper.row_created, created);

                //Create Condition if Name and Phone is empty
                if (name.equals("") && phone.equals("")) {
                    Toast.makeText(AddActivity.this, "Nothing to save", Toast.LENGTH_SHORT).show();
                } else {
                    helper.insertData(values);
                    Cursor cursor = helper.allData();
                    int id = 0;
                    if (cursor.moveToFirst()) {
                        do {
                            if(name.equals(cursor.getString(cursor.getColumnIndex(DBHelper.row_name))))
                            {
                                id=cursor.getInt(cursor.getColumnIndex(DBHelper.row_id));
                            }
                        } while (cursor.moveToNext());
                    }
                    Intent newIntent = new Intent();
                    newIntent.putExtra("ID", id);
                    newIntent.putExtra("NAME", name);
                    newIntent.putExtra("PHONE", phone);
                    newIntent.putExtra("CREATED", created);
                    setResult(1, newIntent);
                    Toast.makeText(AddActivity.this, "Saved", Toast.LENGTH_SHORT).show();
                    finish();
                }
        }
        return super.onOptionsItemSelected(item);
    }
}
