package com.example.ma.volunteersapp;

import android.annotation.TargetApi;
import android.content.Context;
import android.database.Cursor;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CursorAdapter;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class CustomCursorAdapter extends CursorAdapter {

    private LayoutInflater layoutInflater;

    @TargetApi(Build.VERSION_CODES.HONEYCOMB)
    public CustomCursorAdapter(Context context, Cursor c, List items, int flags) {
        super(context, c, flags);
        layoutInflater = (LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public View newView(Context context, Cursor cursor, ViewGroup viewGroup) {
        View v = layoutInflater.inflate(R.layout.row_volunteers, viewGroup, false);
        MyHolder holder = new MyHolder();
        holder.ListID = (TextView)v.findViewById(R.id.listID);
        holder.ListName = (TextView)v.findViewById(R.id.listName);
        holder.ListPhone = (TextView)v.findViewById(R.id.listPhone);
        holder.ListCreated = (TextView)v.findViewById(R.id.listCreated);
        v.setTag(holder);
        return v;
    }

    @Override
    public void bindView(View view, Context context, Cursor cursor) {
        MyHolder holder = (MyHolder)view.getTag();

        holder.ListID.setText(cursor.getString(cursor.getColumnIndex(DBHelper.row_id)));
        holder.ListName.setText(cursor.getString(cursor.getColumnIndex(DBHelper.row_name)));
        holder.ListPhone.setText(cursor.getString(cursor.getColumnIndex(DBHelper.row_phone)));
        holder.ListCreated.setText(cursor.getString(cursor.getColumnIndex(DBHelper.row_created)));
    }

    class MyHolder{
        TextView ListID;
        TextView ListName;
        TextView ListPhone;
        TextView ListCreated;
    }
}
