package com.example.ma.volunteersapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.ArrayList;

public class UsersAdapter extends ArrayAdapter<Volunteer> {
    public UsersAdapter(Context context, ArrayList<Volunteer> users) {
        super(context, 0, users);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Volunteer user = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.row_volunteers, parent, false);
        }
        // Lookup view for data population
        TextView id = (TextView) convertView.findViewById(R.id.listID);
        TextView name = (TextView) convertView.findViewById(R.id.listName);
        TextView phoneNumber = (TextView) convertView.findViewById(R.id.listPhone);
        TextView created = (TextView) convertView.findViewById(R.id.listCreated);
        // Populate the data into the template view using the data object
        id.setText(String.valueOf(user.getId()));
        name.setText(user.getName());
        phoneNumber.setText(user.getPhoneNumber());
        created.setText(user.getDate());
        // Return the completed view to render on screen
        return convertView;
    }

    class MyHolder{
        TextView ListID;
        TextView ListName;
        TextView ListPhone;
        TextView ListCreated;
    }
}

