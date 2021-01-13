package com.example.ma.volunteersapp;

import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    ListView listView;
    DBHelper helper;
    CustomCursorAdapter customCursorAdapter;
    UsersAdapter volunteersAdaptor;
    ArrayList<Volunteer> listItems = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivityForResult(new Intent(MainActivity.this, AddActivity.class),1);
            }
        });

        helper = new DBHelper(this);
        listView = (ListView)findViewById(R.id.list_volunteers);
        listView.setOnItemClickListener(this);
        Cursor cursor = helper.allData();
        if (cursor.moveToFirst()) {
            do {
                int id = cursor.getInt(cursor.getColumnIndex(DBHelper.row_id));
                String name = cursor.getString(cursor.getColumnIndex(DBHelper.row_name));
                String phoneNumber = cursor.getString(cursor.getColumnIndex(DBHelper.row_phone));
                String created = cursor.getString(cursor.getColumnIndex(DBHelper.row_created));
                listItems.add(new Volunteer(id, name, phoneNumber, created));
            } while (cursor.moveToNext());
        }
        System.out.println(listItems);
        volunteersAdaptor = new UsersAdapter(this, listItems);
        setListView();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==1&&resultCode==1){
            ContentValues values = new ContentValues();
            int id = data.getIntExtra("ID",0);
            String name = data.getStringExtra("NAME");
            String phone = data.getStringExtra("PHONE");
            String created = data.getStringExtra("CREATED");
            listView = (ListView)findViewById(R.id.list_volunteers);
            listItems.add(new Volunteer(id,name,phone,created));
            volunteersAdaptor = new UsersAdapter(this, listItems);
            listView.setAdapter(volunteersAdaptor);
        }else if(requestCode==2&&resultCode==2){
            int id = data.getIntExtra("ID",0);
            String name = data.getStringExtra("NAME");
            String phone = data.getStringExtra("PHONE");
            listView = (ListView)findViewById(R.id.list_volunteers);
            System.out.println(id);
            Volunteer vol = listItems.stream().filter(v -> v.getId() == id).findAny().orElse(null);
            System.out.println(vol);
            int index = listItems.indexOf(vol);
            listItems.set(index, new Volunteer(id,name,phone,vol.getDate()));
            volunteersAdaptor = new UsersAdapter(this, listItems);
            listView.setAdapter(volunteersAdaptor);
        }
        else if(requestCode==2&&resultCode==3){
            int id = data.getIntExtra("ID",0);
            listView = (ListView)findViewById(R.id.list_volunteers);
            System.out.println(id);
            Volunteer vol = listItems.stream().filter(v -> v.getId() == id).findAny().orElse(null);
            System.out.println(vol);
            int index = listItems.indexOf(vol);
            listItems.remove(index);
            volunteersAdaptor = new UsersAdapter(this, listItems);
            listView.setAdapter(volunteersAdaptor);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void setListView(){

        listView.setAdapter(volunteersAdaptor);
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int i, long x) {
        TextView getId = (TextView)view.findViewById(R.id.listID);
        final long id = Long.parseLong(getId.getText().toString());
        Cursor cur = helper.oneData(id);
        cur.moveToFirst();
        System.out.println("ID: "+ id);
        Intent idvolunteers = new Intent(MainActivity.this, EditActivity.class);
        idvolunteers.putExtra(DBHelper.row_id, id);
        startActivityForResult(idvolunteers, 2);
    }

//    @Override
//    protected void onResume(){
//        super.onResume();
//        setListView();
//    }
}
